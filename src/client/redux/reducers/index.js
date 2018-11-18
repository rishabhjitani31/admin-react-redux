import { combineReducers } from 'redux'
import login from './login'
import sidebar from './sidebar'
import dashboard from './dashboard'
import zone from './zone'
import model from './model'
import city from './city'
import brands from './brands'
import app from './app'
import tabletStatus from './tabletStatus'
import releaseApk from './releaseApk'
import customer from './customer'
import storeLocation from './storeLocations'
import escalationFlow from './escalationFlow'
import workorder from './workorder'
import staff from './staffManagement'
import serialNo from './serialNo'
import equipments from './equipments'
import releaseNote from './releaseNote'
import uploadModelFile from './uploadModelFile'
import equipmentHistory from './equipmentHistory'
import report from './report'
import socket from './socket'
import mainHeader from './mainHeader'

const rootReducer = combineReducers({
  login,
  sidebar,
  dashboard,
  zone,
  model,
  city,
  brands,
  app,
  tabletStatus,
  releaseApk,
  customer,
  storeLocation,
  escalationFlow,
  workorder,
  staff,
  equipments,
  releaseNote,
  report,
  serialNo,
  socket,
  uploadModelFile,
  mainHeader,
  equipmentHistory
})

export default rootReducer
