import { Router } from 'express'
import patientService from '../services/patientService'
import { toNewPatientEntry } from '../parsers'

const patientsRoute = Router()

patientsRoute
  .route('/')
  .get((_req, res) => {
    const data = patientService.getNonSensitiveEntries()
    return res.json(data)
  })
  .post((req, res) => {
    try {
      const newPatient = toNewPatientEntry(req.body)
      const result = patientService.addPatient(newPatient)
      return res.json(result)
    } catch (error) {
      let msg = 'something went wrong'
      if (error instanceof Error) {
        msg += `Error: ${error.message}`
      }
      return res.status(400).json({ error: msg })
    }
  })

export default patientsRoute
