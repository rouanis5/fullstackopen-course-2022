import data from '../../data/diagnoses'
import { DiagnoseEntry } from '../types'

const getEntries = (): DiagnoseEntry[] => {
  return data
}

export default {
  getEntries
}
