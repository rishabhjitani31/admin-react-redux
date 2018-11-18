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

  getStaffList() {
    const data = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'GET',
      data
    }
    return this.rest('staff', options)
  }

  getPersonByEmail(email) {
    const data = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'GET',
      data: {
        ...data,
        email
      }
    }
    return this.rest('staff/getPersonByEmail', options)
  }

  askAuthForVerification(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'GET',
      data: { ...data, ...ids }
    }
    return this.rest('staff/askCredentials', options)
  }

  staffVerification(data) {
    const options = {
      method: 'POST',
      data
    }
    return this.rest('staff/submitCredentials', options)
  }

  resendVerificationLink(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_email',
      'community_name',
      'community_state'
    ])
    const community_city = getLocalStorageData(['city']).city
    const options = {
      method: 'GET',
      data: { ...data, ...ids, community_city }
    }
    return this.rest('resendInvite', options)
  }

  removeInvitation(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'GET',
      data: { ...data, ...ids }
    }
    return this.rest('deleteStaffInvite', options)
  }

  addEmployee(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'community_email',
      'community_name',
      'community_state'
    ])
    const community_city = getLocalStorageData(['city']).city
    const options = {
      method: 'POST',
      data: { ...data, ...ids, community_city }
    }
    return this.rest('staff/addEmployee', options)
  }

  addStaff(data, record) {
    const ids = getLocalStorageData(['community_email', 'community_name'])
    const community_id = getLocalStorageData([
      'community_id'
    ]).community_id.toString()
    const options = {
      method: 'POST',
      data: {
        ...data,
        ...ids,
        person_id: record.person_id,
        staff_id: record.person_id,
        community_id
      }
    }
    return this.rest('staff/addStaff', options)
  }

  deleteStaff(person_id) {
    const ids = getLocalStorageData([
      'community_id',
      'community_email',
      'community_name'
    ])
    const options = {
      method: 'GET',
      data: { ...ids, person_id }
    }
    return this.rest('staff/deleteEmployeeAndRoles', options)
  }

  getselectedCities(staff_id) {
    const ids = getLocalStorageData(['community_id'])
    const options = {
      method: 'POST',
      data: { ...ids, staff_id }
    }
    return this.rest('staff/editStaff', options)
  }
}

const inst = new Service()
export default inst
