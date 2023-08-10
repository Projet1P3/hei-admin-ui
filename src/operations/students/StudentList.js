import { TextField, Datagrid, ShowButton, EditButton, List, Link, Button, FunctionField } from 'react-admin'
import { Receipt } from '@mui/icons-material'

import authProvider from '../../providers/authProvider'
import { WhoamiRoleEnum } from '../../gen/haClient'

import { profileFilters } from '../profile'
import { pageSize, PrevNextPagination } from '../utils'

const CustomFunctionField = ({ record }) => {
  const handleClick = (event) => {
    event.stopPropagation()
  };

  return (
    <Button label="relevés" onClick={handleClick} component={Link} to={`/students/${record.id}/transcripts`}>
      <Receipt />
    </Button>
  );
};

const StudentList = () => {
  const role = authProvider.getCachedRole()
  return (
    <List label='Étudiants' hasCreate={role === WhoamiRoleEnum.Manager} filters={profileFilters} perPage={pageSize} pagination={<PrevNextPagination />}>
      <Datagrid bulkActionButtons={false} rowClick='show'>
        <TextField source='ref' label='Référence' />
        <TextField source='first_name' label='Prénom·s' />
        <TextField source='last_name' label='Nom·s' />
        {role === WhoamiRoleEnum.Manager ? <EditButton /> : <ShowButton />}
        <FunctionField render={(record) => <CustomFunctionField record={record} />} />
      </Datagrid>
    </List>
  )
}

export default StudentList
