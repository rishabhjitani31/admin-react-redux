import {
  GET_STAFF_LIST_FAILURE,
  GET_STAFF_LIST_REQUEST,
  GET_STAFF_LIST_SUCCESS,
  GET_STAFF_VISIBLE,
  SET_ROLE_TYPE,
  ACTIVE_OUTLET_TAB,
  TOOGLE_VERIFY_INVITATION,
  ON_ADD_CITY_OUTLET,
  ON_REMOVE_CITY_OUTLET,
  ON_CHANGE_ZONE,
  ACTIVE_STAFF_TAB,
  UPDATE_KEYS,
  GET_SELECTED_CITIES_FAILURE,
  GET_SELECTED_CITIES_REQUEST,
  GET_SELECTED_CITIES_SUCCESS,
  UPDATE_SELECTED_CITY_LIST_DATA,
  UPDATE_CITY_LIST_DATA
} from 'constants/staffManagement'
let count = 0
let newList = []
const staff = (
  state = {
    isFetching: false,
    staffs: null,
    error: null,
    visible: false,
    record: null,
    activeStaffTab: 'staff-information',
    activeOutletTab: 'zonewise-outlets',
    toogleVerifyInvitation: null,
    totalCityOutlets: 0,
    keys: [],
    zone_id: null,
    roleType: null,
    selectedCities: [],
    allCityData: [],
    selectedCityList: []
  },
  action
) => {
  switch (action.type) {
    case GET_STAFF_LIST_REQUEST:
      return { ...state, isFetching: true }
    case GET_STAFF_LIST_SUCCESS:
      return { ...state, staffs: action.response, isFetching: false }
    case GET_STAFF_LIST_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_STAFF_VISIBLE:
      return { ...state, visible: action.visible, record: action.record }
    case SET_ROLE_TYPE:
      return { ...state, roleType: action.data }
    case ACTIVE_STAFF_TAB:
      return { ...state, activeStaffTab: action.data }
    case ACTIVE_OUTLET_TAB:
      return { ...state, activeOutletTab: action.data }
    case TOOGLE_VERIFY_INVITATION:
      return { ...state, toogleVerifyInvitation: action.data }
    case ON_ADD_CITY_OUTLET:
      count++
      return {
        ...state,
        totalCityOutlets: action.key++,
        keys: [...state.keys, { key: count, ...action.value }]
      }
    case ON_REMOVE_CITY_OUTLET:
      return {
        ...state,
        totalCityOutlets: state.totalCityOutlets--,
        keys: state.keys.filter(({ key }) => key !== action.key)
      }
    case ON_CHANGE_ZONE:
      return {
        ...state,
        zone_id: action.key,
        keys: state.keys.map(keyObj => {
          if (keyObj.key === action.key) {
            keyObj.zone_id = action.value
          }
          return keyObj
        })
      }
    case UPDATE_KEYS:
      return {
        ...state,
        keys: action.keys
      }
    case GET_SELECTED_CITIES_REQUEST:
      return { ...state }
    case GET_SELECTED_CITIES_SUCCESS:
      editCount++
      if (action.response.data.selectedCities) {
        action.response.data.selectedCities.forEach(elem => {
          elem.cities.forEach(val => {
            newList.push(val.city_id)
          })
        })
      }
      return {
        ...state,
        selectedCities: action.response.data
          ? action.response.data.selectedCities
          : [],
        allCityData: action.response.data
          ? action.response.data.allCityData
          : [],
        totalCityOutlets: action.response.data.selectedCities
          ? action.response.data.selectedCities.length
          : 0,
        selectedCityList: newList
      }
    case GET_SELECTED_CITIES_FAILURE:
      return { ...state, error: action.error }
    case UPDATE_SELECTED_CITY_LIST_DATA:
      return {
        ...state,
        selectedCities: [],
        selectedCityList: [],
        totalCityOutlets: 0
      }
    case UPDATE_CITY_LIST_DATA:
      return {
        ...state,
        selectedCityList: action.data,
        keys: state.keys.map(keyObj => {
          if (keyObj.key === action.key) {
            keyObj.city_ids = action.value
          }
          return keyObj
        })
      }
    default:
      return state
  }
}

export default staff
