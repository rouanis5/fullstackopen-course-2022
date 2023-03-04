import express from 'express'
import 'express-async-errors'
import pingRoute from './routes/ping'
import diagnosesRoute from './routes/diagnoses'
import patientsRoute from './routes/patients'
import { unknownEndpoint, errorHandler } from './utils/middleware'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/ping', pingRoute)
app.use('/api/diagnoses', diagnosesRoute)
app.use('/api/patients', patientsRoute)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
