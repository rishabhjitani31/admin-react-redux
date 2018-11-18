import { UPDATE_CUSTOMER } from 'constants/mainHeader'

export const getCustomer = value => {
  return {
    type: UPDATE_CUSTOMER,
    value
  }
}
