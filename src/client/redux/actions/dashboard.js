import service from '../api/dashboardService'
import { CHANGE_CHART, GET_CHART_DATA } from 'constants/dashboard'

export const changeChartView = event => {
  return {
    type: CHANGE_CHART,
    value: event.target.value
  }
}

export const getChartData = () => {
  return {
    type: GET_CHART_DATA,
    promise: service.getChartData()
  }
}
