import {
  GET_ESCALATION_FLOW_DATA_FAILURE,
  GET_ESCALATION_FLOW_DATA_REQUEST,
  GET_ESCALATION_FLOW_DATA_SUCCESS,
  GET_ESCALATION_FLOW_VISIBLE
} from 'constants/escalationFlow'

const escalationFlow = (
  state = {
    isFetching: false,
    escalationFlowlist: [],
    error: null,
    visible: false,
    record: null,
    sucessMessage: null,
    errorMessage: null
  },
  action
) => {
  switch (action.type) {
    case GET_ESCALATION_FLOW_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_ESCALATION_FLOW_DATA_SUCCESS:
      return {
        ...state,
        escalationFlowlist: action.response.data || [],
        isFetching: false
      }
    case GET_ESCALATION_FLOW_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_ESCALATION_FLOW_VISIBLE:
      return { ...state, visible: action.visible, record: action.record }
    default:
      return state
  }
}

export default escalationFlow
