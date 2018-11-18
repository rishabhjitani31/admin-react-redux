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

  getBrandsList(value) {
    let data = getLocalStorageData(['staff_id'])
    if (value) {
      data.eq_id = value
    }

    const options = {
      method: 'POST',
      data
    }
    return this.rest('equipments/BrandList', options)
  }
  brandEdit(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('equipments/BrandEdit', options)
  }

  brandAdd(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('equipments/BrandAdd', options)
  }

  brandDelete(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('equipments/BrandDelete', options)
  }

  removeBrandImage(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('equipments/removeBrandImage', options)
  }
}

const inst = new Service()
export default inst
