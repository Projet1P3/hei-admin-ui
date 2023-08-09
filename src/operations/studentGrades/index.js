import { EditGuesser } from 'react-admin'

import { Receipt } from '@mui/icons-material'
import { StudentGradeShow } from './StudentGradeShow'
import { StudentGradeList } from './StudentGradeList'

const studentGrades = {
  list: StudentGradeList,
  edit: EditGuesser,
  show: StudentGradeShow,
  icon: Receipt,
  options: { label: 'Notes' }
}

export default studentGrades
