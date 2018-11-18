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

  getSerialNoDataList(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'last_customer'
    ])
    const options = {
      method: 'POST',
      data: {
        community_id: ids.community_id,
        staff_id: ids.staff_id,
        page: data.page,
        rows: data.rows,
        sort: data.sort,
        sortBy: data.sortBy,
        customer_id: ids.last_customer
      }
    }
    if (data.search) {
      options.data.search = data.search
    }
    return this.rest('location/listSerialNoData', options)
  }

  serialNoDelete(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/deleteSerialNo', options)
  }

  serialNoInsert(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/addSerialNo', options)
  }

  serialNoUpdate(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/updateSerialNo', options)
  }
}

const inst = new Service()
export default inst
