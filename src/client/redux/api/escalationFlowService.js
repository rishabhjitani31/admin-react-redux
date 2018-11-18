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

  getEscalationFlowList() {
    const data = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data
    }
    return this.rest('scheduleMail', options)
  }

  addEscalationFlow(values) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...ids, ...values }
    }
    return this.rest('scheduleMail/add', options)
  }

  editEscalationFlow(values, record) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...ids, s_id: record.s_id, ...values }
    }
    return this.rest('scheduleMail/update', options)
  }

  deleteEscalationFlow(record) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...ids, s_id: record.s_id }
    }
    return this.rest('scheduleMail/delete', options)
  }
}

const inst = new Service()
export default inst
