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

  getApartmentsList(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'last_customer'
    ])
    const options = {
      method: 'GET',
      data: {
        staff_id: ids.staff_id,
        community_id: ids.community_id,
        page: (data && data.page) || 0,
        sort: (data && data.sort) || 'apt_name',
        sortBy: (data && data.sortBy) || 'ASC',
        rows: (data && data.rows) || 20
      }
    }
    ids.last_customer && (options.data.customer_id = ids.last_customer)
    data && data.search && (options.data.search = data.search)
    return this.rest('getApartments', options)
  }

  getLocationEquipments(apt_id, type) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        apt_id,
        type
      }
    }
    return this.rest('location/locationEquipments', options)
  }
  addLocation(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: {
        ...data,
        ...ids
      }
    }
    return this.rest('location/addLocation', options)
  }
  getSatffInformation(apt_id) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])

    const options = {
      method: 'POST',

      data: {
        ...ids,
        apt_id
      }
    }
    return this.rest('location/locationStaff', options)
  }

  onDeleteStoreLocation(apt_id) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])

    const options = {
      method: 'GET',

      data: {
        ...ids,
        id: apt_id
      }
    }
    return this.rest('deleteRoom', options)
  }

  getSerialNo(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        ...data
      }
    }
    return this.rest('location/getSerialNo', options)
  }

  getWarrantyForSrNo(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        ...data
      }
    }
    return this.rest('equipments/getWarrantyForSrNo', options)
  }
  updateLocationEquipment(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        active: data.active,
        apt_id: data.apt_id,
        brand_id: data.brand_id,
        eq_id: data.eq_id,
        id: data.id,
        installation_date: data.installation_date,
        model_id: data.model_id,
        sr_no: data.sr_no,
        sr_id: data.sr_id,
        warranty_month: data.warranty_month
      }
    }
    return this.rest('location/updateLocationEquipment', options)
  }

  addEquipment(data, customer_id, apt_id) {
    const ids = getLocalStorageData(['staff_id', 'community_id', 'customer_id'])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        apt_id,
        customer_id,
        locationEquipment: data
      }
    }
    return this.rest('location/addEquipment', options)
  }
  removeEquipment(id) {
    const ids = getLocalStorageData(['staff_id'])

    const options = {
      method: 'POST',

      data: {
        ...ids,
        id
      }
    }
    return this.rest('location/removeEquipment', options)
  }

  getAllOutlets() {
    const data = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data
    }
    return this.rest('getAllOutlets', options)
  }
  activeDeactiveSrNo(active, id) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        active: active,
        id: id
      }
    }
    return this.rest('location/activeDeactiveSrNo', options)
  }
  exportLocationData() {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'GET',
      data: {
        ...ids
      }
    }
    return this.rest('exportLocationData', options)
  }
}

const inst = new Service()
export default inst
