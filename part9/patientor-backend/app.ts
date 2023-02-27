import express from 'express'
import pingRoute from './routes/ping'
import { unknownEndpoint } from './utils/middleware'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/ping', pingRoute)

app.use(unknownEndpoint)

export default app
