import { z } from 'zod'

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.coerce.date(),
  ssn: z.string(),
  gender: z.enum(['male', 'female']),
  occupation: z.string(),
  entries: z.array(z.string()).default([])
})

export const NewPatientSchema = PatientSchema.omit({ id: true })
