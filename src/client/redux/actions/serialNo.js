import service from 'api/serialNoService'
import {
  GET_SERIALNO_VISIBLE,
  GET_SERIAL_DATA,
  ON_EQUIPMENT_CHANGE,
  ON_BRAND_CHANGE,
  ON_MODEL_CHANGE,
  ON_ADD_SERIAL_NO,
  ON_REMOVE_SERIAL_NO,
  ON_CLEAR
} from 'constants/serialNo'

export const getSerialNoDataList = data => {
  return {
    type: GET_SERIAL_DATA,
    promise: service.getSerialNoDataList(data)
  }
}

export const getSerialNoVisible = (visible, record) => {
  return {
    type: GET_SERIALNO_VISIBLE,
    visible,
    record
  }
}

export const onEquipmentChange = value => {
  return {
    type: ON_EQUIPMENT_CHANGE,
    value
  }
}

export const onBrandChange = value => {
  return {
    type: ON_BRAND_CHANGE,
    value
  }
}
export const onModelChange = value => {
  return {
    type: ON_MODEL_CHANGE,
    value
  }
}
export const onAddSerialNo = (key, value) => {
  return {
    type: ON_ADD_SERIAL_NO,
    key,
    value
  }
}

export const onRemoveSerialNo = key => {
  return {
    type: ON_REMOVE_SERIAL_NO,
    key
  }
}

export const onClear = () => {
  return {
    type: ON_CLEAR
  }
}
