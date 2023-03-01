import { v1 as uuid } from 'uuid'
import data from '../../data/patients'
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatientEntry
} from '../types'

const patients: PatientEntry[] = data

const getEntries = (): PatientEntry[] => {
  return patients
}

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return { id, name, dateOfBirth, gender, occupation }
  })
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }
  patients.push(newPatientEntry)
  return newPatientEntry
}

const findById = (id: string) => {
  return patients.find((patient) => patient.id === id)
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
}
