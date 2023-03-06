import { Router } from 'express'
import patientService from '../services/patientService'
import { NewPatientSchema, EntrySchema } from '../schema/Patient'

const patientsRoute = Router()

patientsRoute
  .route('/')
  .get((_req, res) => {
    const data = patientService.getNonSensitiveEntries()
    return res.json(data)
  })
  .post((req, res) => {
    const newPatient = NewPatientSchema.parse(req.body)
    const result = patientService.add(newPatient)
    res.json(result)
  })

patientsRoute.route('/:id').get((req, res) => {
  const result = patientService.findById(req.params.id)
  if (!result) {
    return res.status(404).end()
  }
  return res.json(result)
})

patientsRoute.route('/:id/entries').post((req, res) => {
  const patient = patientService.findById(req.params.id)
  if (!patient) {
    res.status(404).end()
    return
  }

  const entry = EntrySchema.parse(req.body)
  patient.entries.push(entry)
  res.json({ entry })
})

export default patientsRoute
