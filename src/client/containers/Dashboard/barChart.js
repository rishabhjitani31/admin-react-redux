import React from 'react'
import { Bar } from 'react-chartjs-2'
import { getBarChartData, getChartOptions } from 'utils/dashboard'

const BarChart = props => {
  return (
    <Bar
      data={getBarChartData(props)}
      options={getChartOptions(props, false)}
    />
  )
}

export default BarChart
