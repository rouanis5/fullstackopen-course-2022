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
  return patients.map(({ id, name, dateOfBirth, gender, occupation, ssn }) => {
    return { id, name, dateOfBirth, gender, occupation, ssn }
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

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
}
