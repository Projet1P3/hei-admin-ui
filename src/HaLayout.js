import { AppLocationContext } from '@react-admin/ra-navigation'

import HaAppBar from './HaAppBar'
import HaMenu from './menu/HaMenu'
import { MyBreadcrumb } from './MyBreadcrumb'
import { Layout } from 'react-admin'

const HaLayout = props => (
  <AppLocationContext>
    <Layout {...props} appBar={HaAppBar} menu={HaMenu} breadcrumb={MyBreadcrumb} />
  </AppLocationContext>
)

export default HaLayout
