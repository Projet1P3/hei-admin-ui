import { MultiLevelMenu, MenuItemCategory } from '@react-admin/ra-navigation'
import { Menu, useNotify } from 'react-admin'

import { Receipt, AttachMoney, AccountCircle } from '@mui/icons-material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import authProvider from '../providers/authProvider'

export const StudentMenu = props => {
  const notify = useNotify()
  const notifyNotImplemented = () => notify('En cours de développement. Ce qui présage quelques exercices pour vous 😉', { type: 'warning' })
  const whoamiId = authProvider.getCachedWhoami().id
  return (
    <Menu {...props}>
      <Menu.Item to='/profile' name='profile' primaryText='Mon profil' leftIcon={<AccountCircle />} />
      <Menu.Item to={whoamiId ? `/students/${authProvider.getCachedWhoami().id}/fees` : '/'} name='fees' primaryText='Frais' leftIcon={<AttachMoney />} />
      <Menu.Item to='/' name='student-grades' label='Notes' icon={<Receipt />} onClick={notifyNotImplemented} leftIcon={<Receipt />} primaryText='Notes'/>
      <Menu.Item to={`students/${authProvider.getCachedWhoami().id}/transcripts`} name='transcripts' primaryText='Relevés' leftIcon={<PictureAsPdfIcon />} />
    </Menu>
  )
}

export default StudentMenu
