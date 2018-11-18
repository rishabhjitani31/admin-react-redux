import {
  GET_ZONE_DATA_FAILURE,
  GET_ZONE_DATA_REQUEST,
  GET_ZONE_DATA_SUCCESS,
  GET_ZONE_VISIBLE,
  UPDATE_SELECTED_ZONE_DATA
} from 'constants/zone'

const zone = (
  state = {
    isFetching: false,
    zonelist: [],
    error: null,
    visible: false,
    record: null,
    selectedZones: []
  },
  action
) => {
  switch (action.type) {
    case GET_ZONE_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_ZONE_DATA_SUCCESS:
      return {
        ...state,
        zonelist: action.response.data || [],
        isFetching: false
      }
    case GET_ZONE_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_ZONE_VISIBLE:
      return { ...state, visible: action.visible, record: action.record }
    case UPDATE_SELECTED_ZONE_DATA:
      return {
        ...state,
        selectedZones: action.data
      }
    default:
      return state
  }
}

export default zone
