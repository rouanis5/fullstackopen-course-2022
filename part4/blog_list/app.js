const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

logger.info(`connecting to ${config.MONGO_URL}`)

mongoose.set('strictQuery', true)
mongoose.connect(config.MONGO_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error(`error connecting to mongoDB ${error.message}`)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
