import service from 'api/modelService'
import {
  GET_MODEL_DATA,
  GET_MODEL_VISIBLE,
  HANDLE_SELECT_EQUIPMENT_CHANGE,
  HANDLE_SELECT_BRAND_CHANGE,
  HANDLE_SELECT_MODEL_CHANGE
} from 'constants/model'

export const getModelList = () => {
  return {
    type: GET_MODEL_DATA,
    promise: service.getModelList()
  }
}

export const getModalVisible = (visible, record, resetFields) => {
  return {
    type: GET_MODEL_VISIBLE,
    visible,
    record,
    resetFields
  }
}

export const handleSelectEquipmentChange = value => {
  return {
    type: HANDLE_SELECT_EQUIPMENT_CHANGE,
    value,
    name
  }
}
export const handleSelectBrandChange = value => {
  return {
    type: HANDLE_SELECT_BRAND_CHANGE,
    value
  }
}
export const handleSelectModelChange = value => {
  return {
    type: HANDLE_SELECT_MODEL_CHANGE,
    value
  }
}
