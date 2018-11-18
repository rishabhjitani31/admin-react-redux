import FetchBase from './FetchBase'
import { appServiceName } from 'utils/environment'

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

  getEquipmentHistoryList(data) {
    const options = {
      method: 'POST',
      data
    }
    return this.rest('location/locationReport', options)
  }
}

const inst = new Service()
export default inst
