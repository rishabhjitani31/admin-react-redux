import { ON_COLLAPSE } from 'constants/sidebar'
export default function(state = { collapse: false }, action) {
  switch (action.type) {
    case ON_COLLAPSE:
      return { ...state, collapse: action.collapse }
    default:
      return state
  }
}
