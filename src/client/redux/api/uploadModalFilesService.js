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

  getModelDetails(model_id) {
    const staff_id = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { model_id, staff_id }
    }
    return this.rest('equipments/modelDetail', options)
  }

  deleteModal(data, { model_id }) {
    const staff_id = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { model_id, staff_id, url: data.url }
    }
    return this.rest('equipments/removeEquipmentManual', options)
  }

  updateManual(data, { model_id }, manualUpdatedName) {
    console.log(data)
    const staff_id = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        ext: 'jpeg',
        model_id,
        name: manualUpdatedName,
        staff_id: staff_id.staff_id,
        url: data.url
      }
    }
    return this.rest('equipments/renameEquipmentManual', options)
  }

  activeDeactiveManual(isChecked, data, { model_id }) {
    const staff_id = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        active: isChecked,
        model_id,
        staff_id: staff_id.staff_id,
        url: data.url
      }
    }
    return this.rest('equipments/activeDeactiveManual', options)
  }

  uploadModelImages(imgUrls, manualUrls, data) {
    const staff_id = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        image_urls: imgUrls,
        manual_url: manualUrls,
        model_id: data.model_id,
        staff_id
      }
    }
    return this.rest('equipments/addEquipmentManual', options)
  }
}

const inst = new Service()
export default inst
