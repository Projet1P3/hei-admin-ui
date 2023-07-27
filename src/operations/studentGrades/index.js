import { ListGuesser, EditGuesser, ShowGuesser } from 'react-admin'

import { Receipt } from '@mui/icons-material'
import { StudentGradeShow } from './StudentGradeShow'

const studentGrades = {
  list: ListGuesser,
  edit: EditGuesser,
  show: StudentGradeShow,
  icon: Receipt,
  options: { label: 'Notes' }
}

export default studentGrades
