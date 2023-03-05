import { Patient, Diagnosis } from '../../types'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import patientService from '../../services/patients'
import GenderIcon from './GenderIcon'

const PatientProfile = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<Patient | null>(null)
  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    patientService.getOne(id).then((data) => setPatient(data))
  }, [id])

  if (!patient) return null
  return (
    <div>
      <h2>
        {patient.name} <GenderIcon gender={patient.gender} />
      </h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          {new Date(entry.date).toLocaleDateString()} {entry.description}
          <ul>
            {entry.diagnosisCodes.map((code, index) => (
              <li key={index}>
                {code}{' '}
                {diagnoses.find((diagnose) => diagnose.code === code)?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default PatientProfile
