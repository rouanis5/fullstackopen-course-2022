const { ApolloServer } = require('@apollo/server')
const { v1: uuid } = require('uuid')
const { startStandaloneServer } = require('@apollo/server/standalone')
let { authors, books } = require('./data')

/*
  you can remove the placeholder query once your first own has been implemented
*/

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
    author: String!
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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, { author, genre }) => {
      let result = books

      if (author) {
        result = result.filter((book) => book.author === author)
      }
      if (genre) {
        result = result.filter((book) => book.genres.includes(genre))
      }
      return result
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() }
      books = books.concat(book)

      const authorInAuthors = authors
        .map((author) => author.name)
        .includes(args.author)

      if (!authorInAuthors) {
        authors = authors.concat({
          name: args.author,
          id: uuid()
        })
      }

      return book
    },
    editAuthor: (root, { name, setBornTo }) => {
      const author = authors.find((author) => author.name === name)
      if (!author) return

      author.born = setBornTo
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
