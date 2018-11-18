import React from 'react'
import asyncComponent from 'hoc/asyncRender'
import { Route, Switch, Redirect } from 'react-router-dom'
import Private from 'hoc/private'

const AppLayout = asyncComponent(() =>
  import('components/AppLayout').then(module => module.default)
)

const Login = asyncComponent(() =>
  import('components/Login/Login').then(module => module.default)
)

const ChangePassword = asyncComponent(() =>
  import('containers/ChangePassword').then(module => module.default)
)

const Profile = asyncComponent(() =>
  import('containers/Profile').then(module => module.default)
)

const EquipmentHistory = asyncComponent(() =>
  import('containers/EquipmentHistory').then(module => module.default)
)

const ForgotPassword = asyncComponent(() =>
  import('containers/ForgotPassword').then(module => module.default)
)

const Dashboard = asyncComponent(() =>
  import('containers/Dashboard').then(module => module.default)
)

const Customer = asyncComponent(() =>
  import('containers/Customer').then(module => module.default)
)

const Zone = asyncComponent(() =>
  import('containers/Zone').then(module => module.default)
)

const City = asyncComponent(() =>
  import('containers/City').then(module => module.default)
)

const StoreLocations = asyncComponent(() =>
  import('containers/StoreLocations').then(module => module.default)
)

const EditEquipment = asyncComponent(() =>
  import('containers/StoreLocations/Modal/Equipment').then(
    module => module.default
  )
)

const OutletInformation = asyncComponent(() =>
  import('containers/StoreLocations/Modal/OutletInformation').then(
    module => module.default
  )
)

const StaffInformation = asyncComponent(() =>
  import('./containers/StoreLocations/Modal/StaffInformation').then(
    module => module.default
  )
)

const Equipments = asyncComponent(() =>
  import('containers/Equipments').then(module => module.default)
)

const Brands = asyncComponent(() =>
  import('containers/Brands').then(module => module.default)
)

const Models = asyncComponent(() =>
  import('containers/Models').then(module => module.default)
)

const SerialNo = asyncComponent(() =>
  import('containers/SerialNo').then(module => module.default)
)

const WorkOrder = asyncComponent(() =>
  import('containers/WorkOrder').then(module => module.default)
)

const EscalationFlow = asyncComponent(() =>
  import('containers/EscalationFlow').then(module => module.default)
)

const Chat = asyncComponent(() =>
  import('containers/Chat').then(module => module.default)
)

const StaffManagement = asyncComponent(() =>
  import('containers/StaffManagement/StaffManagement').then(
    module => module.default
  )
)

const Reports = asyncComponent(() =>
  import('containers/Reports').then(module => module.default)
)

const TabletStatus = asyncComponent(() =>
  import('containers/TabletStatus').then(module => module.default)
)

const App = asyncComponent(() =>
  import('containers/App').then(module => module.default)
)

const ReleaseApk = asyncComponent(() =>
  import('containers/ReleaseApk').then(module => module.default)
)

const ReleaseNote = asyncComponent(() =>
  import('containers/ReleaseNote').then(module => module.default)
)

const WhatsNew = asyncComponent(() =>
  import('containers/WhatsNew').then(module => module.default)
)

const NotFound = asyncComponent(() =>
  import('containers/NotFound').then(module => module.default)
)

const Privacy = asyncComponent(() =>
  import('containers/Privacy').then(module => module.default)
)

const Terms = asyncComponent(() =>
  import('containers/TermsAndConditions').then(module => module.default)
)

const UploadModelFiles = asyncComponent(() =>
  import('containers/UploadModelFiles').then(module => module.default)
)

const redirect = pathname => () => {
  return <Redirect to={{ pathname }} />
}

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Private component={AppLayout} />
    </Switch>
  )
}

export const ContentRoute = () => {
  return (
    <Switch>
      <Route exact path="/" render={redirect('dashboard')} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/customer" component={Customer} />
      <Route exact path="/zone" component={Zone} />
      <Route exact path="/city" component={City} />
      <Route exact path="/storeLocations" component={StoreLocations} />
      <Route exact path="/editEquipment" component={EditEquipment} />
      <Route exact path="/addLocation" component={OutletInformation} />
      <Route exact path="/editLocation" component={OutletInformation} />
      <Route exact path="/staffInformation" component={StaffInformation} />
      <Route exact path="/equipments" component={Equipments} />
      <Route exact path="/brands" component={Brands} />
      <Route exact path="/Models" component={Models} />
      <Route exact path="/SerialNo" component={SerialNo} />
      <Route exact path="/workOrder" component={WorkOrder} />
      <Route exact path="/escalationFlow" component={EscalationFlow} />
      <Route exact path="/staffManagement" component={StaffManagement} />
      <Route exact path="/reports" component={Reports} />
      <Route exact path="/tabletStatus" component={TabletStatus} />
      <Route exact path="/app" component={App} />
      <Route exact path="/releaseApk" component={ReleaseApk} />
      <Route exact path="/releaseNotes" component={ReleaseNote} />
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/whatsNew" component={WhatsNew} />
      <Route exact path="/privacypolicy" component={Privacy} />
      <Route exact path="/termscondition" component={Terms} />
      <Route exact path="/uploadModelFiles" component={UploadModelFiles} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/changePassword" component={ChangePassword} />
      <Route exact path="/equipmentHistory" component={EquipmentHistory} />
      <Route exact path="/*" component={NotFound} />
    </Switch>
  )
}
export default Routes
