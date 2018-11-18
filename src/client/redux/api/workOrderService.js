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
  getWorkOrderListWithPagination(data) {
    const { last_customer, staff_id, community_id } = getLocalStorageData([
      'staff_id',
      'community_id',
      'last_customer'
    ])
    const options = {
      method: 'POST',
      data: {
        staff_id,
        community_id,
        customer_id: last_customer,
        ...data
      }
    }
    return this.rest('api/staff/v1/getWorkOrderTickets', options)
  }
  fetchWorkOrderDetail(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'GET',
      data: { ...data, ...ids }
    }
    return this.rest('api/staff/v1/getTicketDetails', options)
  }

  getOutletList(customer_id) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'GET',
      data: { customer_id, ...ids }
    }
    return this.rest('apartments', options)
  }
  getStaffList(apt_id) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { apt_id, ...ids }
    }
    return this.rest('staffAssigneeList', options)
  }
  getIssuesList(eq_id) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { eq_id, ...ids }
    }
    return this.rest('api/staff/v1/getIssueList', options)
  }
  getEquipmentsByOutlet(apt_id) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { apt_id, ...ids }
    }
    return this.rest('location/getEquipmentByOutlet', options)
  }
  getBrandsByOutlet(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/getBrandsByOutlet', options)
  }
  getModelsByOutlet(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/getModelsByOutlet', options)
  }
  getSrnosByOutlet(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('location/getSrNoByOutlet', options)
  }
  workOrderAdd(params) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'role_name',
      'role_ids',
      'last_customer'
    ])

    params.customer_id = ids.last_customer
      ? ids.last_customer
      : params.customer_id

    const options = {
      method: 'POST',
      data: {
        ...params,
        staff_id: ids.staff_id,
        community_id: ids.community_id,
        action_staff_id: ids.staff_id,
        role: ids.role_name,
        role_ids: ids.role_ids
      }
    }
    return this.rest('api/staff/v1/createStaffTicket', options)
  }

  removeWorkOrderImage(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id', 'role_ids'])
    const options = {
      method: 'POST',
      data: { ...data, action_staff_id: ids.staff_id, ...ids }
    }
    return this.rest('api/staff/v1/removeTicketImageById', options)
  }

  changeTitleOutletCustData(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, action_staff_id: ids.staff_id, ...ids }
    }
    return this.rest('api/staff/v1/updateOtherTicket', options)
  }

  changeEquipmentsData(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, action_staff_id: ids.staff_id, ...ids }
    }
    return this.rest('api/staff/v1/updateTicketData', options)
  }
  changeAssigneeData(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'role_ids',
      'role_name'
    ])
    const options = {
      method: 'POST',
      data: {
        ...data,
        action_staff_id: ids.staff_id,
        ...ids,
        role: ids.role_name
      }
    }
    return this.rest('api/staff/v1/changeMaintenanceAssignee', options)
  }
  sendTicketComment(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'role_ids',
      'role_name'
    ])
    const options = {
      method: 'POST',
      data: {
        ...data,
        ...ids,
        role: ids.role_name
      }
    }
    return this.rest('api/staff/v1/addTicketComment', options)
  }
  startTicketWork(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'role_ids',
      'role_name',
      'community_email'
    ])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        ...data,
        action_staff_id: ids.staff_id
      }
    }
    return this.rest('api/staff/v1/startTicketWork', options)
  }

  stopTicketWork(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'role_ids',
      'role_name',
      'community_email'
    ])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        ...data,
        action_staff_id: ids.staff_id
      }
    }
    return this.rest('api/staff/v1/stopTicketWork', options)
  }

  completeTicketWork(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'role_ids',
      'role_name',
      'community_email'
    ])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        ...data,
        action_staff_id: ids.staff_id
      }
    }
    return this.rest('api/staff/v1/completeTicketWork', options)
  }

  verifyTicketWork(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'role_ids',
      'role_name',
      'community_email'
    ])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        ...data,
        action_staff_id: ids.staff_id
      }
    }
    return this.rest('api/staff/v1/verifyTicketStaff', options)
  }

  getReportData(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        ...data
      }
    }
    return this.rest('api/staff/v1/getReportTickets', options)
  }

  createTicketReceipt(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        action_staff_id: ids.staff_id,
        ...data
      }
    }
    return this.rest('api/staff/v1/createTicketReceipt', options)
  }

  updateTicketReceipt(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        action_staff_id: ids.staff_id,
        ...data
      }
    }
    return this.rest('api/staff/v1/updateTicketReceipt', options)
  }

  uploadWorkOrderImage(data) {
    const ids = getLocalStorageData([
      'staff_id',
      'community_id',
      'role_ids',
      'role_name'
    ])
    const options = {
      method: 'POST',
      data: {
        ...ids,
        action_staff_id: ids.staff_id,
        ...data,
        lang: 'en',
        role: ids.role_name
      }
    }
    return this.rest('api/staff/v1/uploadWorkOrderImage', options)
  }

  readTicketComments(data) {
    const { staff_id, community_id, last_customer } = getLocalStorageData([
      'staff_id',
      'community_id',
      'last_customer'
    ])
    const options = {
      method: 'POST',
      data: {
        staff_id,
        community_id,
        ...data,
        customer_id: last_customer
      }
    }
    return this.rest('api/staff/v1/readTicketComments', options)
  }

  readAllTickets(data) {
    const { staff_id, community_id, last_customer } = getLocalStorageData([
      'staff_id',
      'community_id',
      'last_customer'
    ])
    const options = {
      method: 'POST',
      data: {
        staff_id,
        community_id,
        ...data,
        customer_id: last_customer
      }
    }
    return this.rest('api/staff/v1/readAllTickets', options)
  }
}

const inst = new Service()
export default inst
