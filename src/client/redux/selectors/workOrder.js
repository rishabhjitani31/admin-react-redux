import { getLocalStorageData } from 'utils/localStorage'

const ids = getLocalStorageData(['user_role', 'staff_id'])

export const getEditCondition = (assigneeId, status) => {
  return (
    (ids.user_role === 'manager' ||
      ids.user_role === 'master' ||
      ids.user_role === 'reg_manager' ||
      ids.staff_id === assigneeId) &&
    !(status === 4 || status === 5)
  )
}

export const checkHigherRole = () => {
  return (
    ids.user_role === 'manager' ||
    ids.user_role === 'master' ||
    ids.user_role === 'reg_manager'
  )
}
export const getEditCondition2 = assigneeId => {
  return (
    ids.user_role === 'manager' ||
    ids.user_role === 'master' ||
    ids.user_role === 'reg_manager' ||
    ids.staff_id === assigneeId
  )
}
