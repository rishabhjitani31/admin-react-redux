import service from 'api/reportsService'
import {
  GET_REPORT_DATA,
  GET_REPORT_VISIBLE,
  ON_ZONE_CHANGE_ON_REPORT,
  ON_CITY_CHANGE_ON_REPORT,
  GET_ALL_CUSTOMER_DATA,
  GET_ALL_ZONE_DATA,
  GET_ALL_STAFF_DATA,
  GET_CITY_BY_ZONE_ID,
  GET_LOCATION_BY_ZONE_CITY_ID
} from 'constants/report'

export const getReportList = values => {
  return {
    type: GET_REPORT_DATA,
    promise: service.getReportList(values)
  }
}

export const getAllCustomerList = () => {
  return {
    type: GET_ALL_CUSTOMER_DATA,
    promise: service.getAllCustomerList()
  }
}

export const getAllZoneList = () => {
  return {
    type: GET_ALL_ZONE_DATA,
    promise: service.getAllZoneList()
  }
}
export const getAllStaffList = () => {
  return {
    type: GET_ALL_STAFF_DATA,
    promise: service.getAllStaffList()
  }
}

export const getCityByZoneId = zone_id => {
  return {
    type: GET_CITY_BY_ZONE_ID,
    promise: service.getCityByZoneId(zone_id)
  }
}

export const getLocationByCityZoneId = (zone_id, city_id) => {
  return {
    type: GET_LOCATION_BY_ZONE_CITY_ID,
    promise: service.getLocationByCityZoneId(zone_id, city_id)
  }
}

export const getReportVisible = (visible, record) => {
  return {
    type: GET_REPORT_VISIBLE,
    visible,
    record
  }
}

export const onZoneChange = value => {
  return {
    type: ON_ZONE_CHANGE_ON_REPORT,
    value
  }
}

export const onCityChange = value => {
  return {
    type: ON_CITY_CHANGE_ON_REPORT,
    value
  }
}
