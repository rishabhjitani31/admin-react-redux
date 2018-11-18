import service from 'api/escalationFlowService'
import {
  GET_ESCALATION_FLOW_DATA,
  GET_ESCALATION_FLOW_VISIBLE
} from 'constants/escalationFlow'

export const getEscalationFlowList = () => {
  return {
    type: GET_ESCALATION_FLOW_DATA,
    promise: service.getEscalationFlowList()
  }
}

export const getEscalationFlowVisible = (visible, record) => {
  return {
    type: GET_ESCALATION_FLOW_VISIBLE,
    visible,
    record
  }
}
