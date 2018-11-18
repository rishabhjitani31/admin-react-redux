import FetchBase from './FetchBase'
import { appServiceName } from 'utils/environment'
import { getLocalStorageData } from 'utils/localStorage'

class dashboardService extends FetchBase {
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

  getEquipmentsData() {
    const { staff_id } = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { staff_id }
    }
    return this.rest('equipments/equipmentList', options)
  }

  addNewEquipment = data => {
    const options = {
      method: 'POST',
      data
    }
    return this.rest('equipments/equipmentAdd', options)
  }

  editEquipment = data => {
    const options = {
      method: 'POST',
      data
    }
    return this.rest('equipments/equipmentEdit', options)
  }

  deleteEquipment = data => {
    const { staff_id } = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        eq_id: data.eq_id,
        staff_id
      }
    }
    return this.rest('equipments/equipmentDelete', options)
  }

  getDefaultIssuesList = info => {
    const { staff_id } = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        staff_id
      }
    }
    return this.rest('equipments/defaultIssuesList', options)
  }

  updateIssueList = info => {
    const { staff_id } = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        eq_id: info.eq_id,
        issue_ids: info.issue_ids,
        staff_id
      }
    }
    return this.rest('equipments/equipmentAddIssues', options)
  }

  addNewIssue = info => {
    const { staff_id } = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        staff_id,
        title: info
      }
    }
    return this.rest('equipments/defaultIssuesAdd', options)
  }

  deleteIssue = info => {
    const { staff_id } = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        staff_id,
        id: info
      }
    }
    return this.rest('equipments/defaultIssuesRemove', options)
  }

  updateSelectedIssue = (id, title) => {
    const { staff_id } = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        staff_id,
        id: id,
        title: title
      }
    }
    return this.rest('equipments/defaultIssuesEdit', options)
  }

  removeEquipmentImage = (data, selectedEquipment) => {
    const { staff_id } = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: {
        eq_id: data.name,
        image_url: data.url,
        staff_id: staff_id,
        thumb_url: selectedEquipment.thumb_url[0]
      }
    }
    return this.rest('equipments/removeEquipmentImage', options)
  }
}

const inst = new dashboardService()
export default inst
