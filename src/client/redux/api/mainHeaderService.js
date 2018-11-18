import FetchBase from './FetchBase'
import { appServiceName } from 'utils/environment'
import { getLocalStorageData } from 'utils/localStorage'

class Service extends FetchBase {
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

  updateCustomerDropdown(customer_id) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        customer_id,
        staff_id: ids.staff_id
      }
    }
    return this.rest('updateCustomer', options)
  }
}

const inst = new Service()
export default inst
