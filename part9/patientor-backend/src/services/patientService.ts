import data from '../../data/patients'
import { PatientEntry, NonSensitivePatentEntry } from '../types'

const getEntries = (): PatientEntry[] => {
  return data
}

const getNonSensitiveEntries = (): NonSensitivePatentEntry[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation, ssn }) => {
    return { id, name, dateOfBirth, gender, occupation, ssn }
  })
}

export default {
  getEntries,
  getNonSensitiveEntries
}
