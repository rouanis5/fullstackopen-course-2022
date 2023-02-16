const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { authors, books } = require('./data')
/*
  you can remove the placeholder query once your first own has been implemented
*/

const typeDefs = `
  type Query {
    dummy: Int
  }
`

const resolvers = {
  Query: {
    dummy: () => 0
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
