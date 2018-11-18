import service from 'api/staffManagementService'
import {
  GET_STAFF_LIST,
  GET_STAFF_VISIBLE,
  ACTIVE_OUTLET_TAB,
  TOOGLE_VERIFY_INVITATION,
  ON_ADD_CITY_OUTLET,
  ON_REMOVE_CITY_OUTLET,
  ON_CHANGE_ZONE,
  SET_ROLE_TYPE,
  ACTIVE_STAFF_TAB,
  UPDATE_KEYS,
  GET_SELECTED_CITIES,
  UPDATE_SELECTED_CITY_LIST_DATA,
  UPDATE_CITY_LIST_DATA
} from 'constants/staffManagement'

export const getStaffList = () => {
  return {
    type: GET_STAFF_LIST,
    promise: service.getStaffList()
  }
}

export const getStaffVisible = (visible, record) => {
  return {
    type: GET_STAFF_VISIBLE,
    visible,
    record
  }
}

export const setRoleType = data => {
  return {
    type: SET_ROLE_TYPE,
    data
  }
}

export const updateActiveOutletTab = data => {
  return {
    type: ACTIVE_OUTLET_TAB,
    data
  }
}

export const toogleVerifyInvitation = data => {
  return {
    type: TOOGLE_VERIFY_INVITATION,
    data
  }
}

export const onAddCityOutlet = (key, value) => {
  return {
    type: ON_ADD_CITY_OUTLET,
    key,
    value
  }
}

export const onRemoveCityOutlet = key => {
  return {
    type: ON_REMOVE_CITY_OUTLET,
    key
  }
}

export const onChangeZone = (key, value) => {
  return {
    type: ON_CHANGE_ZONE,
    key,
    value
  }
}

export const updateActiveStaffTab = data => {
  return {
    type: ACTIVE_STAFF_TAB,
    data
  }
}
export const updateKeys = keys => {
  return {
    type: UPDATE_KEYS,
    keys
  }
}

export const getSelectedCitites = id => {
  return {
    type: GET_SELECTED_CITIES,
    promise: service.getselectedCities(id)
  }
}

export const updateSelectedCityList = data => {
  return {
    type: UPDATE_SELECTED_CITY_LIST_DATA,
    data
  }
}

export const updateCityList = (key, value) => {
  return {
    type: UPDATE_CITY_LIST_DATA,
    key,
    value
  }
}
