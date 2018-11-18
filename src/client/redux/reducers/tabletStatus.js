import {
  GET_TABLET_STATUS_DATA_FAILURE,
  GET_TABLET_STATUS_DATA_REQUEST,
  GET_TABLET_STATUS_DATA_SUCCESS,
  GET_TABLET_STATUS_VISIBLE
} from 'constants/tabletStatus'

const tabletStatus = (
  state = {
    isFetching: false,
    tabletStatuslist: [],
    error: null,
    visible: false,
    record: null,
    sucessMessage: null,
    errorMessage: null
  },
  action
) => {
  switch (action.type) {
    case GET_TABLET_STATUS_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_TABLET_STATUS_DATA_SUCCESS:
      return {
        ...state,
        tabletStatuslist: action.response.data || [],
        isFetching: false
      }
    case GET_TABLET_STATUS_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_TABLET_STATUS_VISIBLE:
      return { ...state, visible: action.visible, record: action.record }
    default:
      return state
  }
}

export default tabletStatus
