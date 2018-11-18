import FetchBase from './FetchBase'
import { appServiceName } from 'utils/environment'
import { getLocalStorageData } from 'utils/localStorage'

class ChatService extends FetchBase {
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
  getChatRooms() {
    const { staff_id, community_id, last_customer } = getLocalStorageData([
      'staff_id',
      'community_id',
      'last_customer'
    ])
    const options = {
      method: 'POST',
      data: {
        isAdmin: true,
        staff_id,
        community_id,
        customer_id: last_customer
      }
    }
    return this.rest('chatrooms', options)
  }

  getOutletGroup() {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'GET',
      data: {
        ...ids
      }
    }
    return this.rest('api/staff/v1/apartments', options)
  }
  getChatList(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'GET',
      data: {
        ...ids,
        ...data
      }
    }
    return this.rest('api/staff/v1/messages', options)
  }
}

const inst = new ChatService()
export default inst
