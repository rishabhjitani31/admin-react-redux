import service from 'service'
import { LOGIN } from 'constants/login'

export const userLoginApi = (data, history) => {
  return {
    type: LOGIN,
    promise: service.userLogin(data),
    isLogin: true,
    history
  }
}
