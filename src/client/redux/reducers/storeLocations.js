import {
  GET_STORE_LOCATION_DATA_FAILURE,
  GET_STORE_LOCATION_DATA_REQUEST,
  GET_STORE_LOCATION_DATA_SUCCESS,
  GET_LOCATION_EQUIPMENT_DATA_FAILURE,
  GET_LOCATION_EQUIPMENT_DATA_REQUEST,
  GET_LOCATION_EQUIPMENT_DATA_SUCCESS,
  GET_SATFF_INFORMATION_DATA_REQUEST,
  GET_SATFF_INFORMATION_DATA_SUCCESS,
  GET_SATFF_INFORMATION_DATA_FAILURE,
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
  GET_ALL_OUTLET_DATA_REQUEST,
  GET_ALL_OUTLET_DATA_SUCCESS,
  GET_ALL_OUTLET_DATA_FAILURE,
  UPDATE_SELECTED_OUTLET_LIST_DATA
} from 'constants/storeLocations'

const storeLocations = (
  state = {
    isFetching: false,
    storeLocationData: null,
    error: null,
    equipmentsData: [],
    satffInformationLists: [],
    visible: false,
    equipmentForm: [],
    record: null,
    filterCityList: [],
    outlets: {
      isFetching: false,
      outletsData: [],
      error: null
    },
    selectedOutletlist: []
  },
  action
) => {
  switch (action.type) {
    case GET_STORE_LOCATION_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_STORE_LOCATION_DATA_SUCCESS:
      return {
        ...state,
        storeLocationData: action.response || [],
        isFetching: false
      }
    case GET_STORE_LOCATION_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }

    case GET_LOCATION_EQUIPMENT_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_LOCATION_EQUIPMENT_DATA_SUCCESS:
      return {
        ...state,
        equipmentsData: action.response.data.equipmentsData || [],
        isFetching: false
      }
    case GET_LOCATION_EQUIPMENT_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }

    case GET_SATFF_INFORMATION_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_SATFF_INFORMATION_DATA_SUCCESS:
      return {
        ...state,
        satffInformationLists: action.response.data || [],
        isFetching: false
      }
    case GET_SATFF_INFORMATION_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }

    case EQUIPMENT_MODAL_VISIBLE:
      return {
        ...state,
        visible: action.visible,
        record: action.record
      }
    case EQUIPMENT_ADD_FORM:
      return {
        ...state,
        equipmentForm: [...state.equipmentForm, action.equipmentForm]
      }
    case EQUIPMENT_CANCEL_FORM:
      return {
        ...state,
        equipmentForm: []
      }
    case EQUIPMENT_REMOVE_FORM_DATA: {
      const equipmentForm = [...state.equipmentForm]
      equipmentForm.splice(action.key, 1)
      return {
        ...state,
        equipmentForm
      }
    }
    case SET_FILTER_BRAND_LIST_DATA: {
      const equipmentForm = [...state.equipmentForm]
      equipmentForm[action.index].eq_id = action.id
      equipmentForm[action.index].brand_id = ''
      equipmentForm[action.index].model_id = ''
      equipmentForm[action.index].sr_no = ''
      equipmentForm[action.index].sr_id = ''
      equipmentForm[action.index].warranty_month = ''
      equipmentForm[action.index].serialNoList = []
      equipmentForm[action.index].brandslist = action.filterBrandsList
      equipmentForm[action.index].modelList = []

      return {
        ...state,
        equipmentForm
      }
    }
    case SET_FILTER_MODEL_LIST_DATA: {
      const equipmentForm = [...state.equipmentForm]
      equipmentForm[action.index].brand_id = action.id
      equipmentForm[action.index].model_id = ''
      equipmentForm[action.index].sr_no = ''
      equipmentForm[action.index].sr_id = ''
      equipmentForm[action.index].warranty_month = ''
      equipmentForm[action.index].serialNoList = []
      equipmentForm[action.index].modelList = action.filterModelList
      return {
        ...state,
        equipmentForm
      }
    }
    case ON_MODLE_CHANGE: {
      const equipmentForm = [...state.equipmentForm]
      equipmentForm[action.index].model_id = action.id
      equipmentForm[action.index].sr_no = ''
      equipmentForm[action.index].serialNoList = action.serialNoList
      return {
        ...state,
        equipmentForm
      }
    }
    case ON_SERIAL_NO_SELECT: {
      const equipmentForm = [...state.equipmentForm]
      equipmentForm[action.index].radio_val = action.value
      equipmentForm[action.index].sr_no = ''
      equipmentForm[action.index].sr_id = ''
      equipmentForm[action.index].warranty_month = ''
      equipmentForm[action.index].warrantyForSrNoList =
        action.warrantyForSrNoList
      return {
        ...state,
        equipmentForm
      }
    }

    case ON_SERIAL_CHANGE: {
      const equipmentForm = [...state.equipmentForm]
      equipmentForm[action.index].sr_id = action.sr_id
      equipmentForm[action.index].sr_no = action.sr_no
      equipmentForm[action.index].warranty_month = ''
      equipmentForm[action.index].warrantyForSrNoList =
        action.warrantyForSrNoList
      return {
        ...state,
        equipmentForm
      }
    }
    case ON_WARRANTY_CHANGE: {
      const equipmentForm = [...state.equipmentForm]
      equipmentForm[action.index].warranty_month = action.warranty_month
      return {
        ...state,
        equipmentForm
      }
    }
    case ON_INSTALLATION_DATE_CHANGE: {
      const equipmentForm = [...state.equipmentForm]
      equipmentForm[action.index].installation_date = action.installation_date
      return {
        ...state,
        equipmentForm
      }
    }
    case ON_ZONE_CHANGE: {
      return {
        ...state,
        filterCityList: action.filterCityList
      }
    }
    case GET_ALL_OUTLET_DATA_REQUEST:
      return {
        ...state,
        outlets: {
          ...state.outlets,
          isFetching: true
        }
      }
    case GET_ALL_OUTLET_DATA_SUCCESS:
      return {
        ...state,
        outlets: {
          ...state.outlets,
          outletsData: action.response || [],
          isFetching: false
        }
      }
    case GET_ALL_OUTLET_DATA_FAILURE:
      return {
        ...state,
        outlets: {
          ...state.outlets,
          error: action.error,
          isFetching: false
        }
      }
    case UPDATE_SELECTED_OUTLET_LIST_DATA:
      return {
        ...state,
        selectedOutletlist: action.data
      }
    default:
      return state
  }
}

export default storeLocations
