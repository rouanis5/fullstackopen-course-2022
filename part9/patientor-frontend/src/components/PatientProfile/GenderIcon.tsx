import { Gender } from '../../types'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'

type propsType = {
  gender: Gender
}

const GenderIcon = (props: propsType) => {
  switch (props.gender) {
    case Gender.Male:
      return <MaleIcon />
    case Gender.Female:
      return <FemaleIcon />
  }
}

export default GenderIcon
