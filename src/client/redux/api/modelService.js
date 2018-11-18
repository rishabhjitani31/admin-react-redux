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

  getModelList() {
    const data = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data
    }
    return this.rest('equipments/modelList', options)
  }

  modelDelete(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('equipments/modelDelete', options)
  }

  addEquipmentModel(values) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...values, ...ids }
    }
    return this.rest('equipments/modelAdd', options)
  }

  editEquipmentModel(record, values) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...values, ...ids, model_id: record.model_id }
    }
    return this.rest('equipments/modelEdit', options)
  }
}

const inst = new Service()
export default inst
