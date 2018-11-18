class DashboardPM {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getChartData()
    this.props.getWorkOrderListWithPagination({
      page: 0,
      rows: 20,
      sort: '',
      sortBy: 'DESC'
    })
  }
  onRowClick = ({ ticket_id }) => {
    return {
      onClick: () => {
        this.props.history.push({
          pathname: '/workOrder',
          state: { ticket_id }
        })
      }
    }
  }
}
export default DashboardPM
