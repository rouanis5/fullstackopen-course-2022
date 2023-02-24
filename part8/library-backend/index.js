// i need to revise the role of these
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { useServer } = require('graphql-ws/lib/use/ws')
const { ApolloServer } = require('@apollo/server')
const {
  ApolloServerPluginDrainHttpServer
} = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
// ----------------------------------
const { WebSocketServer } = require('ws')
const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { typeDefs, resolvers, context } = require('./graphql')
const config = require('./utils/config')

mongoose.set('strictQuery', true)
mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error(`error connecting to mongoDB ${error.message}`)
  })

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema }, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context
    })
  )

  httpServer.listen(config.PORT, () => {
    console.log(`Server is now running on http://localhost:${config.PORT}`)
  })
}

start()
