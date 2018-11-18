import service from 'api/cityService'
import { GET_CITY_DATA, GET_CITY_VISIBLE } from 'constants/city'

export const getCityList = () => {
  return {
    type: GET_CITY_DATA,
    promise: service.getCityList()
  }
}

export const getCityVisible = (visible, record) => {
  return {
    type: GET_CITY_VISIBLE,
    visible,
    record
  }
}
