import { Router } from 'express'
import patientService from '../services/patientService'

const patientsRoute = Router()

patientsRoute.get('/', (_req, res) => {
  const data = patientService.getNonSensitiveEntries()
  return res.json(data)
})

export default patientsRoute
