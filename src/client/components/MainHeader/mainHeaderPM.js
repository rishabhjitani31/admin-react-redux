import { getLocalStorageData, setLocalStorageData } from 'utils/localStorage'
import service from 'api/mainHeaderService'
import { message } from 'antd'
class MainHeaderPM {
  constructor(props) {
    this.props = props
  }
  async fetch() {
    await this.props.getCustomerList()

    //set last selected customer to dropdown
    const data = getLocalStorageData(['last_customer', 'last_customer_name'])
    this.props.getCustomer(data.last_customer)

    //save last selected customer name to local storage
    if (
      (data.last_customer || data.last_customer !== 0) &&
      !data.last_customer_name
    ) {
      let lastCustomer = this.props.customerlist.find(
        element => element.customer_id === data.last_customer
      )
      if (lastCustomer && lastCustomer.customer_name) {
        let lastCustomerName = lastCustomer.customer_name
        const commonData = getLocalStorageData([])
        setLocalStorageData({
          ...commonData,
          last_customer_name: lastCustomerName
        })
      }
    }
  }

  setProfile = () => {
    this.props.history.push('/profile')
  }

  onChangePassword = () => {
    this.props.history.push('/changePassword')
  }

  logout = () => {
    localStorage.clear()
    this.props.history.push('/login')
  }

  handleChange = async (value, Option) => {
    try {
      const response = await service.updateCustomerDropdown(value)
      if (response.success === 1) {
        this.props.getCustomer(value)
        const commonData = getLocalStorageData([])
        setLocalStorageData({
          ...commonData,
          last_customer: value,
          last_customer_name: Option.props.children[2]
        })
        switch (this.props.history.location.pathname) {
          case '/dashboard':
            this.props.getChartData()
            this.props.getWorkOrderListWithPagination({
              page: 0,
              rows: 20,
              sort: '',
              sortBy: 'DESC'
            })
            return
          case '/storeLocations':
            this.props.getStoreLocationsLists()
            return
          case '/workOrder':
            await this.props.getWorkOrderListWithPagination({
              page: 0,
              rows: 20,
              sort: '',
              sortBy: 'DESC'
            })
            this.props.getChatRooms(true) //get updated workorder count for side bar
            //open ticket from dashboard table
            if (
              this.props.location.state &&
              this.props.location.state.ticket_id
            ) {
              this.getTicketDetail(this.props.location.state.ticket_id)
              this.props.history.push({
                //reset history state
                pathname: '/workOrder',
                state: { ticket_id: '' }
              })
            }
            return
          case '/reports':
            this.props.getReportList()
            return
          default:
            return
        }
      } else {
        message.error('Error while changing customer! Please try again.', 3)
      }
    } catch (error) {
      message.error('Error!', 3)
    }
  }
}
export default MainHeaderPM
