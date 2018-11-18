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

  getCustomerList() {
    const data = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data
    }
    return this.rest('location/CustomerList', options)
  }
  removeCustomerImage(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/removeCustomerImage', options)
  }
  customerEdit(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/CustomerEdit', options)
  }
  customerAdd(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/CustomerAdd', options)
  }
  customerDelete(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/CustomerRemove', options)
  }
}

const inst = new Service()
export default inst
