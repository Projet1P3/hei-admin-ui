import { ListGuesser, EditGuesser, ShowGuesser } from 'react-admin'

import { Receipt } from '@mui/icons-material'
import { StudentGradeShow } from './StudentGradeShow'
import { EditClaimForm } from './EditClaimForm'

const studentGrades = {
  list: ListGuesser,
  edit: EditClaimForm,
  show: StudentGradeShow,
  icon: Receipt,
  options: { label: 'Notes' }
}

export default studentGrades
