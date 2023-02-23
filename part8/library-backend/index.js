const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('./utils/config')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

mongoose.set('strictQuery', true)
mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error(`error connecting to mongoDB ${error.message}`)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, { author: authorName, genre }) => {
      const author = await Author.findOne({ name: authorName })
      if (author) {
        if (genre) {
          return await Book.find({ author: author.id, genres: [genre] })
        }
        return await Book.find({ author: author.id })
      }
      if (genre) {
        return await Book.find({ genres: { $in: [genre] } })
      }
      return await Book.find({})
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root.id })
    }
  },
  Book: {
    author: async (root) => {
      return await Author.findById(root.author)
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      // {title, published, author, genres}
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = await Author.create({ name: args.author })
        }
        return await Book.create({ ...args, author: author._id })
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
    },
    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      try {
        return await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true, runValidators: true, context: 'query' }
        )
      } catch (error) {
        throw new GraphQLError('author update failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
    },
    createUser: async (root, { username, favouriteGenre }) => {
      const user = new User({ username, favouriteGenre })
      return await user.save().catch((error) => {
        throw new GraphQLError('create user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [username],
            error
          }
        })
      })
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== 'password') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.name,
        id: user.id
      }

      return {
        value: jwt.sign(userForToken, config.JWT_SECRET, {
          expiresIn: 3600
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: config.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
