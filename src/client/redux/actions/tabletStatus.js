import service from 'api/tabletStatusService'
import {
  GET_TABLET_STATUS_DATA,
  GET_TABLET_STATUS_VISIBLE
} from 'constants/tabletStatus'

export const getTabletStatusList = () => {
  return {
    type: GET_TABLET_STATUS_DATA,
    promise: service.getTabletStatusList()
  }
}

export const getTabletStatusVisible = (visible, record) => {
  return {
    type: GET_TABLET_STATUS_VISIBLE,
    visible,
    record
  }
}
