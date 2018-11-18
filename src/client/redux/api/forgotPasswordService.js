import FetchBase from './FetchBase'
import { appServiceName } from 'utils/environment'

class ForgotPasswordService extends FetchBase {
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

  forgetPassword(data) {
    const options = {
      method: 'POST',
      data: { ...data }
    }
    return this.rest('forget_password', options)
  }
}

const inst = new ForgotPasswordService()
export default inst
