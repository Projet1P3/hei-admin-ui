import { MultiLevelMenu, MenuItemCategory } from '@react-admin/ra-navigation'

import { AccountCircle, School } from '@mui/icons-material'
import { Menu } from 'react-admin'

const TeacherMenu = (props) => {
  return (
    <Menu {...props}>
      <Menu.Item to='/profile' name='profile' primaryText='Mon profil' icon={<AccountCircle />} />
      <Menu.Item to='/students' name='students' primaryText='Étudiants' icon={<School />} />
    </Menu>
  );

}
export default TeacherMenu
