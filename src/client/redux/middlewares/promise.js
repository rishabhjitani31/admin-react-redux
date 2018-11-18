const promiseMiddleware = () => {
  return next => action => {
    const { promise, type, isLogin, history, ...rest } = action
    if (!promise) return next(action)

    const SUCCESS = type + '_SUCCESS'
    const REQUEST = type + '_REQUEST'
    const FAILURE = type + '_FAILURE'
    next({ ...rest, type: REQUEST })
    return promise
      .then(response => {
        next({ ...rest, response: response, type: SUCCESS })
        if (isLogin && response.token) {
          let commonData = {
            staff_id: response.data.user.staff_id,
            last_customer: response.data.user.last_customer,
            user_name: response.data.user.user_name,
            country_code: response.data.user.country_code,
            email: response.data.user.email,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            phone: response.data.user.phone,
            user_role: response.data.user.user_role,
            community_id: response.data.communities[0].community_id,
            community_email: response.data.communities[0].email,
            sessionToken: response.token,
            workOrderCount: response.data.workOrderCount,
            city: response.data.communities[0].city,
            role_name: response.data.user.role_name,
            role_ids: response.data.user.role_ids,
            community_name: response.data.communities[0].community_name,
            community_state: response.data.communities[0].state
          }
          localStorage.setItem('sessionToken', response.token)
          localStorage.setItem('commonData', JSON.stringify(commonData))
          history.push('/dashboard')
        }
        return true
      })
      .catch(error => {
        next({ ...rest, error, type: FAILURE })
        return false
      })
  }
}
export default promiseMiddleware
