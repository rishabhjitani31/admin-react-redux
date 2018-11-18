import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from 'constants/login'
const login = (
  state = { isFetching: false, loginDetails: [], error: null },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isFetching: true }
    case LOGIN_SUCCESS:
      return { ...state, loginDetails: action.response, isFetching: false }
    case LOGIN_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    default:
      return state
  }
}

export default login
