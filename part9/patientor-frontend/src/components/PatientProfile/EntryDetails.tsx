import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Diagnosis
} from '../../types'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import WorkIcon from '@mui/icons-material/Work'

const style: React.CSSProperties = {
  paddingInline: '20px',
  border: 'solid 1px #000',
  borderRadius: '10px',
  marginBottom: '10px'
}
const HospitalEntryView = ({
  entry,
  diagnoses
}: {
  entry: HospitalEntry
  diagnoses: Diagnosis[]
}) => {
  return (
    <div style={style}>
      <p>
        {new Date(entry.date).toLocaleDateString()} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes.map((code, index) => (
          <li key={index}>
            {code} {diagnoses.find((diagnose) => diagnose.code === code)?.name}
          </li>
        ))}
      </ul>
      <p> diagnose by {entry.specialist}</p>
    </div>
  )
}

const OccupationalHealthcareEntryView = ({
  entry,
  diagnoses
}: {
  entry: OccupationalHealthcareEntry
  diagnoses: Diagnosis[]
}) => {
  return (
    <div style={style}>
      <p>
        {new Date(entry.date).toLocaleDateString()} <WorkIcon />{' '}
        {entry.employerName}
        <p>{entry.description}</p>
        <ul>
          {entry.diagnosisCodes.map((code, index) => (
            <li key={index}>
              {code}{' '}
              {diagnoses.find((diagnose) => diagnose.code === code)?.name}
            </li>
          ))}
        </ul>
        <p> diagnose by {entry.specialist}</p>
      </p>
    </div>
  )
}

const EntryDetails = ({
  entry,
  diagnoses
}: {
  entry: Entry
  diagnoses: Diagnosis[]
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryView entry={entry} diagnoses={diagnoses} />
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntryView entry={entry} diagnoses={diagnoses} />
      )
  }
}

export default EntryDetails
