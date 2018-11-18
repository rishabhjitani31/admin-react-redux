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

  getCityList() {
    const data = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data
    }
    return this.rest('location/cityList', options)
  }
  cityEdit(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/cityEdit', options)
  }

  cityAdd(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/cityAdd', options)
  }

  cityDelete(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/cityDelete', options)
  }
}

const inst = new Service()
export default inst
