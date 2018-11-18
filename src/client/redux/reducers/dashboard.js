import {
  CHANGE_CHART,
  GET_CHART_DATA_REQUEST,
  GET_CHART_DATA_FAILURE,
  GET_CHART_DATA_SUCCESS
} from 'constants/dashboard'

const initialState = {
  chartToggle: 'lineChart',
  isFetching: false,
  error: null,
  chartData: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CHART:
      return { ...state, chartToggle: action.value }
    case GET_CHART_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_CHART_DATA_SUCCESS:
      return {
        ...state,
        chartData: action.response.data.ticketData || {},
        isFetching: false
      }
    case GET_CHART_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    default:
      return state
  }
}
