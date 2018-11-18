//get label data for Chart
export const getLabelData = chartData => {
  return Object.keys(chartData)
}

//get ticket data for Chart
export const getTicketDataByType = chartData => {
  let ticketDataByType = {},
    created = [],
    pending = [],
    completed = [],
    verified = []

  for (var key in chartData) {
    created.push(chartData[key][0]['created'] + chartData[key][0]['reopen'])
    pending.push(chartData[key][0]['pending'])
    completed.push(chartData[key][0]['completed'])
    verified.push(chartData[key][0]['verified'])
  }
  ticketDataByType.created = created
  ticketDataByType.pending = pending
  ticketDataByType.completed = completed
  ticketDataByType.verified = verified

  return ticketDataByType
}
