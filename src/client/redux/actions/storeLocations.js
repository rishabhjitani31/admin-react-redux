import service from 'api/storeLocationsService'
import {
  GET_STORE_LOCATION_DATA,
  GET_LOCATION_EQUIPMENT_DATA,
  GET_SATFF_INFORMATION_DATA,
  EQUIPMENT_MODAL_VISIBLE,
  EQUIPMENT_ADD_FORM,
  EQUIPMENT_CANCEL_FORM,
  EQUIPMENT_REMOVE_FORM_DATA,
  SET_FILTER_BRAND_LIST_DATA,
  SET_FILTER_MODEL_LIST_DATA,
  ON_MODLE_CHANGE,
  ON_SERIAL_NO_SELECT,
  ON_SERIAL_CHANGE,
  ON_WARRANTY_CHANGE,
  ON_INSTALLATION_DATE_CHANGE,
  ON_ZONE_CHANGE,
  GET_ALL_OUTLET_DATA,
  UPDATE_SELECTED_OUTLET_LIST_DATA
} from 'constants/storeLocations'

export const getStoreLocationsLists = data => {
  return {
    type: GET_STORE_LOCATION_DATA,
    promise: service.getApartmentsList(data)
  }
}

export const getLocationEquipmentsLists = apt_id => {
  return {
    type: GET_LOCATION_EQUIPMENT_DATA,
    promise: service.getLocationEquipments(apt_id, 'equipment')
  }
}
export const getSatffInformation = apt_id => {
  return {
    type: GET_SATFF_INFORMATION_DATA,
    promise: service.getSatffInformation(apt_id)
  }
}

export const equipmentModalVisible = (visible, record) => {
  return {
    type: EQUIPMENT_MODAL_VISIBLE,
    visible,
    record
  }
}

export const addEquipmentForm = equipmentForm => {
  return {
    type: EQUIPMENT_ADD_FORM,
    equipmentForm
  }
}

export const cancelEquipmentForm = () => {
  return {
    type: EQUIPMENT_CANCEL_FORM
  }
}
export const removeEquipmentData = key => {
  return {
    type: EQUIPMENT_REMOVE_FORM_DATA,
    key
  }
}

export const storeFilterBrandsList = (filterBrandsList, index, id) => {
  return {
    type: SET_FILTER_BRAND_LIST_DATA,
    filterBrandsList,
    index,
    id
  }
}
export const storeFilterModelList = (filterModelList, index, id) => {
  return {
    type: SET_FILTER_MODEL_LIST_DATA,
    filterModelList,
    index,
    id
  }
}

export const setModelChange = (serialNoList, index, id) => {
  return {
    type: ON_MODLE_CHANGE,
    serialNoList,
    index,
    id
  }
}

export const onSerialNoselect = (value, index, warrantyForSrNoList) => {
  return {
    type: ON_SERIAL_NO_SELECT,
    value,
    index,
    warrantyForSrNoList
  }
}

export const setSerialNoChange = (warrantyForSrNoList, sr_no, sr_id, index) => {
  return {
    type: ON_SERIAL_CHANGE,
    warrantyForSrNoList,
    sr_no,
    sr_id,
    index
  }
}
export const setWarrantyChange = (warranty_month, index) => {
  return {
    type: ON_WARRANTY_CHANGE,
    warranty_month,
    index
  }
}

export const setInstallmentDataChange = (installation_date, index) => {
  return {
    type: ON_INSTALLATION_DATE_CHANGE,
    installation_date,
    index
  }
}

export const onZoneChange = filterCityList => {
  return {
    type: ON_ZONE_CHANGE,
    filterCityList
  }
}

export const getAllOutletLists = () => {
  return {
    type: GET_ALL_OUTLET_DATA,
    promise: service.getAllOutlets()
  }
}

export const updateSelectedOutletList = selectedOutletlist => {
  return {
    type: UPDATE_SELECTED_OUTLET_LIST_DATA,
    data: selectedOutletlist
  }
}
