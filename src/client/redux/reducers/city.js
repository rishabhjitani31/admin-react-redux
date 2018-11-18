import {
  GET_CITY_DATA_FAILURE,
  GET_CITY_DATA_REQUEST,
  GET_CITY_DATA_SUCCESS,
  GET_CITY_VISIBLE
} from 'constants/city'

const city = (
  state = {
    isFetching: false,
    citylist: [],
    error: null,
    visible: false,
    record: null
  },
  action
) => {
  switch (action.type) {
    case GET_CITY_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_CITY_DATA_SUCCESS:
      return {
        ...state,
        citylist: action.response.data || [],
        isFetching: false
      }
    case GET_CITY_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_CITY_VISIBLE:
      return { ...state, visible: action.visible, record: action.record }
    default:
      return state
  }
}

export default city
