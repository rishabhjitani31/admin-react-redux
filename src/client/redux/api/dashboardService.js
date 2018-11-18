import FetchBase from './FetchBase'
import { appServiceName } from 'utils/environment'
import { getLocalStorageData } from 'utils/localStorage'

class dashboardService extends FetchBase {
  get url() {
    return appServiceName
  }
  defaultHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('sessionToken')
    }
  }

  getChartData() {
    const data = getLocalStorageData([
      'staff_id',
      'community_id',
      'last_customer'
    ])
    const options = {
      method: 'POST',
      data: {
        staff_id: data.staff_id,
        community_id: data.community_id,
        customer_id: data.last_customer,
        days: 7
      }
    }
    return this.rest('ticketDataByDate', options)
  }
}

const inst = new dashboardService()
export default inst
