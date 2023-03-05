import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import patientService from '../services/patients'
import { Patient, Gender } from '../types'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import { Diagnosis } from '../types'

const PatientProfile = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
  const [patient, setPatient] = useState<Patient | null>(null)
  const { id } = useParams()

  useEffect(() => {
    if (!id) return
    patientService.getOne(id).then((data) => setPatient(data))
  }, [id])

  if (!patient) return null

  const GenderIcon = () => {
    switch (patient.gender) {
      case Gender.Male:
        return <MaleIcon />
      case Gender.Female:
        return <FemaleIcon />
    }
  }

  return (
    <div>
      <h2>
        {patient.name} <GenderIcon />
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
