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

  getReleaseNoteList() {
    const data = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'GET',
      data
    }
    return this.rest('releaseNotesList', options)
  }

  releaseNoteAdd(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('addReleaseNote', options)
  }
}

const inst = new Service()
export default inst
