import React from 'react'
import { Line } from 'react-chartjs-2'
import { getLineChartData, getChartOptions } from 'utils/dashboard'

const LineChart = props => {
  return (
    <Line
      data={getLineChartData(props)}
      options={getChartOptions(props, true)}
    />
  )
}

export default LineChart
