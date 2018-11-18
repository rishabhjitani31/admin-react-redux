import { UPDATE_CUSTOMER } from 'constants/mainHeader'

const mainHeader = (
  state = {
    lastCustomer: 0
  },
  action
) => {
  switch (action.type) {
    case UPDATE_CUSTOMER:
      return { ...state, lastCustomer: action.value }
    default:
      return state
  }
}

export default mainHeader
