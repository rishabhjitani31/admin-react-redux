import {
  GET_REPORT_DATA_FAILURE,
  GET_REPORT_DATA_REQUEST,
  GET_REPORT_DATA_SUCCESS,
  GET_REPORT_VISIBLE,
  ON_ZONE_CHANGE_ON_REPORT,
  ON_CITY_CHANGE_ON_REPORT,
  GET_ALL_CUSTOMER_DATA_FAILURE,
  GET_ALL_CUSTOMER_DATA_REQUEST,
  GET_ALL_CUSTOMER_DATA_SUCCESS,
  GET_ALL_ZONE_DATA_FAILURE,
  GET_ALL_ZONE_DATA_REQUEST,
  GET_ALL_ZONE_DATA_SUCCESS,
  GET_ALL_STAFF_DATA_FAILURE,
  GET_ALL_STAFF_DATA_REQUEST,
  GET_ALL_STAFF_DATA_SUCCESS,
  GET_CITY_BY_ZONE_ID_FAILURE,
  GET_CITY_BY_ZONE_ID_REQUEST,
  GET_CITY_BY_ZONE_ID_SUCCESS,
  GET_LOCATION_BY_ZONE_CITY_ID_FAILURE,
  GET_LOCATION_BY_ZONE_CITY_ID_REQUEST,
  GET_LOCATION_BY_ZONE_CITY_ID_SUCCESS
} from 'constants/report'

const report = (
  state = {
    isFetching: false,
    reportlist: [],
    error: null,
    visible: false,
    record: null,
    selectedZone: null,
    selectedCity: null,
    selectedLocation: null,
    filteredCityList: [],
    filteredLocationList: [],
    allCustomerList: [],
    allZoneList: [],
    allStaffList: []
  },
  action
) => {
  switch (action.type) {
    case GET_REPORT_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_REPORT_DATA_SUCCESS:
      return {
        ...state,
        reportlist: action.response.data.getReportsList || [],
        isFetching: false
      }
    case GET_REPORT_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }

    case GET_ALL_CUSTOMER_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_ALL_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        allCustomerList: action.response.data.customers || [],
        isFetching: false
      }
    case GET_ALL_CUSTOMER_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }

    case GET_ALL_ZONE_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_ALL_ZONE_DATA_SUCCESS:
      return {
        ...state,
        allZoneList: action.response.data.zones || [],
        isFetching: false
      }
    case GET_ALL_ZONE_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }

    case GET_ALL_STAFF_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_ALL_STAFF_DATA_SUCCESS:
      return {
        ...state,
        allStaffList: action.response.data.staffList || [],
        isFetching: false
      }
    case GET_ALL_STAFF_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }

    case GET_CITY_BY_ZONE_ID_REQUEST:
      return { ...state }
    case GET_CITY_BY_ZONE_ID_SUCCESS:
      return {
        ...state,
        filteredCityList: action.response.data.cities || []
      }
    case GET_CITY_BY_ZONE_ID_FAILURE:
      return { ...state, error: action.error }

    case GET_LOCATION_BY_ZONE_CITY_ID_REQUEST:
      return { ...state }
    case GET_LOCATION_BY_ZONE_CITY_ID_SUCCESS:
      return {
        ...state,
        filteredLocationList: action.response.data.locations || []
      }
    case GET_LOCATION_BY_ZONE_CITY_ID_FAILURE:
      return { ...state, error: action.error }

    case GET_REPORT_VISIBLE:
      return { ...state, visible: action.visible, record: action.record }
    case ON_ZONE_CHANGE_ON_REPORT:
      return {
        ...state,
        selectedZone: action.filterCityList,
        selectedCity: null
      }
    case ON_CITY_CHANGE_ON_REPORT:
      return {
        ...state,
        selectedCity: action.value
      }
    default:
      return state
  }
}

export default report
