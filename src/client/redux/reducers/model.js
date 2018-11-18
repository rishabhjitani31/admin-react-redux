import {
  GET_MODEL_DATA_FAILURE,
  GET_MODEL_DATA_REQUEST,
  GET_MODEL_DATA_SUCCESS,
  GET_MODEL_VISIBLE,
  HANDLE_SELECT_EQUIPMENT_CHANGE,
  HANDLE_SELECT_MODEL_CHANGE,
  HANDLE_SELECT_BRAND_CHANGE
} from 'constants/model'

const model = (
  state = {
    isFetching: false,
    modellist: [],
    error: null,
    visible: false,
    record: null,
    sucessMessage: null,
    errorMessage: null,
    selectedValue: {
      model_name: '',
      brand_id: '',
      eq_id: ''
    }
  },
  action
) => {
  switch (action.type) {
    case GET_MODEL_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_MODEL_DATA_SUCCESS:
      return {
        ...state,
        modellist: action.response.data || [],
        isFetching: false
      }
    case GET_MODEL_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_MODEL_VISIBLE: {
      let selectedValue = state.selectedValue
      if (action.record) {
        selectedValue.model_name = action.record.model_name
        selectedValue.brand_id = action.record.brand_id
        selectedValue.eq_id = action.record.eq_id
      }
      if (action.resetFields) {
        selectedValue.eq_id = ''
        selectedValue.model_name = ''
        selectedValue.brand_id = ''
      }
      return {
        ...state,
        visible: action.visible,
        record: action.record,
        selectedValue
      }
    }
    case HANDLE_SELECT_EQUIPMENT_CHANGE: {
      let selectedValue = state.selectedValue
      selectedValue.eq_id = action.value
      selectedValue.brand_id = ''
      return {
        ...state,
        selectedValue
      }
    }
    case HANDLE_SELECT_BRAND_CHANGE: {
      let selectedValue = state.selectedValue
      selectedValue.brand_id = action.value
      return {
        ...state,
        selectedValue
      }
    }
    case HANDLE_SELECT_MODEL_CHANGE: {
      let selectedValue = state.selectedValue
      selectedValue.model_name = action.value
      return {
        ...state,
        selectedValue
      }
    }
    default:
      return state
  }
}

export default model
