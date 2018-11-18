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

  getTabletStatusList() {
    const options = {
      method: 'POST',
      data: {}
    }
    return this.rest('api/users/v1/getTablets', options)
  }

  refreshTablet(data) {
    const ids = getLocalStorageData(['community_id'])
    const options = {
      method: 'GET',
      data: { user_id: data.user_id, ...ids }
    }
    return this.rest('api/staff/v1/refreshTablet', options)
  }

  rebootTablet(data) {
    const ids = getLocalStorageData(['community_id'])
    const options = {
      method: 'POST',
      data: { user_id: data.user_id, ...ids }
    }
    return this.rest('api/staff/v1/rebootTablet', options)
  }

  refreshAllRecords() {
    const data = getLocalStorageData(['community_id'])
    const options = {
      method: 'GET',
      data
    }
    return this.rest('api/staff/v1/askTabletStatus', options)
  }
}

const inst = new Service()
export default inst
