import { z } from 'zod'
import { PatientSchema, NewPatientSchema } from './schema/Patient'
import { DiagnoseSchema } from './schema/Diagnose'

export type PatientEntry = z.infer<typeof PatientSchema>
export type NewPatientEntry = z.infer<typeof NewPatientSchema>
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>

export type DiagnoseEntry = z.infer<typeof DiagnoseSchema>
