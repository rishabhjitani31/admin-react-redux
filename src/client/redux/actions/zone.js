import service from 'api/zoneService'
import {
  GET_ZONE_DATA,
  GET_ZONE_VISIBLE,
  UPDATE_SELECTED_ZONE_DATA
} from 'constants/zone'

export const getZoneList = () => {
  return {
    type: GET_ZONE_DATA,
    promise: service.getZoneList()
  }
}

export const getZoneVisible = (visible, record) => {
  return {
    type: GET_ZONE_VISIBLE,
    visible,
    record
  }
}

export const updateSelectedZoneList = selectedZoneList => {
  return {
    type: UPDATE_SELECTED_ZONE_DATA,
    data: selectedZoneList
  }
}
