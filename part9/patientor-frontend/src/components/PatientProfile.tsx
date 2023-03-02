import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import patientService from '../services/patients'
import { Patient, Gender } from '../types'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'

const PatientProfile = () => {
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
    </div>
  )
}

export default PatientProfile
