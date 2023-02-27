// export type Gender = 'male' | 'female'
export enum Gender {
  Male = 'male',
  Female = 'female'
}

export interface PatientEntry {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>
export type NewPatientEntry = Omit<PatientEntry, 'id'>

export interface DiagnoseEntry {
  code: string
  name: string
  latin?: string
}
