const { ApolloServer } = require('@apollo/server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const context = require('./context')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

module.exports = { server, context }
