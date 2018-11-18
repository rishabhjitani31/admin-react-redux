import service from 'api/equipmentHistoryService'
import { GET_EQUIPMENT_HISTORY_DATA } from 'constants/equipmentHistory'

export const getEquipmentHistoryList = data => {
  return {
    type: GET_EQUIPMENT_HISTORY_DATA,
    promise: service.getEquipmentHistoryList(data)
  }
}
