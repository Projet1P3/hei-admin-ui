import { ListGuesser, EditGuesser, ShowGuesser } from 'react-admin'

import { Receipt } from '@mui/icons-material'
import { StudentTranscriptList } from './StudentTranscriptList'
import StudentTranscriptShow from './StudentTranscriptShow'

const studentTranscripts = {
  list: StudentTranscriptList,
  edit: EditGuesser,
  show: StudentTranscriptShow,
  icon: Receipt,
  options: { label: 'Notes' }
}

export default studentTranscripts
