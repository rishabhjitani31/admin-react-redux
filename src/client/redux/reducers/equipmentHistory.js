import {
  GET_EQUIPMENT_HISTORY_DATA_FAILURE,
  GET_EQUIPMENT_HISTORY_DATA_REQUEST,
  GET_EQUIPMENT_HISTORY_DATA_SUCCESS
} from 'constants/equipmentHistory'

const equipmentHistory = (
  state = {
    isFetching: false,
    equipmentHistoryList: [],
    error: null,
    record: null
  },
  action
) => {
  console.log('action.type', action.type)
  switch (action.type) {
    case GET_EQUIPMENT_HISTORY_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_EQUIPMENT_HISTORY_DATA_SUCCESS:
      return {
        ...state,
        equipmentHistoryList: action.response.data || [],
        isFetching: false
      }
    case GET_EQUIPMENT_HISTORY_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    default:
      return state
  }
}

export default equipmentHistory
