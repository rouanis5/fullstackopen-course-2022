const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const { server, context } = require('./graphql')
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

startStandaloneServer(server, {
  listen: { port: config.PORT },
  context
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
