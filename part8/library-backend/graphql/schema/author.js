const typeDef = `
type Author {
  name: String!
  born: Int
  id: ID!
  bookCount: Int
}

type Query {
  authorCount: Int!
  allAuthors: [Author!]!
}

type Mutation {
  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author
}
`

module.exports = typeDef
