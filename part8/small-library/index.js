const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const config = require('./utils/config')
const Author = require('./models/Author')
const Book = require('./models/Book')

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, { author, genre }) => {
      return await Book.find({ author, genres: [genre] })
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root.name }).exec()
      // return Book.find({ author: root.name }).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      // {title, published, author, genres}
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = await Author.create({ name: args.author })
        }
        return await Book.create({ ...args, author: author._id })
      } catch (error) {
        console.log(error.message)
      }
    },
    editAuthor: async (root, { name, setBornTo }) => {
      try {
        return await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true, runValidators: true, context: 'query' }
        )
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: config.PORT }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
