import { z } from 'zod'

export const BasicEntrySchema = z.object({
  id: z.string(),
  date: z.coerce.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).default([]),
  description: z.string()
})

export const HospitalEntrySchema = BasicEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.coerce.date(),
    criteria: z.string()
  })
})

export const OccupationalHealthcareEntrySchema = BasicEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.coerce.date(),
      endDate: z.coerce.date()
    })
    .optional()
})

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string(),
  dateOfBirth: z.coerce.date(),
  ssn: z.string(),
  gender: z.enum(['male', 'female']),
  occupation: z.string(),
  entries: z
    .array(z.union([HospitalEntrySchema, OccupationalHealthcareEntrySchema]))
    .default([])
})

export const NewPatientSchema = PatientSchema.omit({ id: true })
