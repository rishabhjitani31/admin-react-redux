import FetchBase from './FetchBase'
import { appServiceName } from 'utils/environment'

class Service extends FetchBase {
  get url() {
    return appServiceName
  }
  defaultHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      // sessionToken: ats.stores.session.token
    }
  }

  userLogin(data) {
    const options = {
      method: 'POST',
      data
    }
    return this.rest('login', options)
  }
}

const inst = new Service()
export default inst
