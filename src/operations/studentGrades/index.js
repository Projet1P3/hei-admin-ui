import { ListGuesser, EditGuesser, ShowGuesser } from 'react-admin'

import { Receipt } from '@mui/icons-material'
import { StudentGradeList } from './StudentGradeList'
import StudentGradeShow from './StudentGradeShow'

const studentGrades = {
  list: StudentGradeList,
  edit: EditGuesser,
  show: StudentGradeShow,
  icon: Receipt,
  options: { label: 'Notes' }
}

export default studentGrades
