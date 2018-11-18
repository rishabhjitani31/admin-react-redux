import FetchBase from './FetchBase'
import { appServiceName } from 'utils/environment'
import { getLocalStorageData } from 'utils/localStorage'

class ChangePasswordService extends FetchBase {
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
  changePassword(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('staff/changePassword', options)
  }
}

const inst = new ChangePasswordService()
export default inst
