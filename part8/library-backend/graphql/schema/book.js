const typeDef = `
type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
}

type Query {
  bookCount: Int!
  allBooks(author: String, genre: String): [Book!]!
}

type Mutation {
  addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
  ): Book
}
`

module.exports = typeDef
