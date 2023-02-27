import { Router } from 'express'
import diagnoseService from '../services/diagnoseService'

const diagnosesRoute = Router()

diagnosesRoute.get('/', (_req, res) => {
  const data = diagnoseService.getEntries()
  return res.json(data)
})

export default diagnosesRoute
