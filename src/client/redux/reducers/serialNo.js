import {
  GET_SERIALNO_VISIBLE,
  GET_SERIAL_DATA_REQUEST,
  GET_SERIAL_DATA_SUCCESS,
  GET_SERIAL_DATA_FAILURE,
  ON_EQUIPMENT_CHANGE,
  ON_BRAND_CHANGE,
  ON_MODEL_CHANGE,
  ON_ADD_SERIAL_NO,
  ON_REMOVE_SERIAL_NO,
  ON_CLEAR
} from 'constants/serialNo'
let count = 0
const serialNo = (
  state = {
    isFetching: false,
    serialNolist: [],
    serialNoData: [],
    brandsValue: null,
    modelValue: null,
    modelSelected: null,
    error: null,
    visible: false,
    record: null,
    totalSerialNos: 0,
    keys: [],
    tableSettings: {
      position: 'both',
      showQuickJumper: true,
      pageSize: 20,
      defaultCurrent: 1,
      current: 1,
      total: 0,
      showSizeChanger: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    }
  },
  action
) => {
  switch (action.type) {
    case GET_SERIAL_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_SERIAL_DATA_SUCCESS: {
      let tableSettings = { ...state.tableSettings }
      tableSettings.total = action.response.count
      tableSettings.pageSize = action.response.rows
      tableSettings.defaultCurrent = action.response.page + 1
      tableSettings.current = action.response.page + 1
      return {
        ...state,
        serialNoData: action.response.data || [],
        tableSettings,
        isFetching: false
      }
    }
    case GET_SERIAL_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_SERIALNO_VISIBLE: {
      let brandsValue = state.brandsValue
      let modelValue = state.modelValue

      if (action.record) {
        brandsValue = action.record.eq_id
        modelValue = action.record.brand_id
      }

      return {
        ...state,
        visible: action.visible,
        record: action.record,
        brandsValue,
        modelValue
      }
    }

    case ON_EQUIPMENT_CHANGE:
      return { ...state, brandsValue: action.value }
    case ON_BRAND_CHANGE:
      return { ...state, modelValue: action.value }
    case ON_MODEL_CHANGE:
      return { ...state, modelSelected: action.value }
    case ON_ADD_SERIAL_NO:
      count++
      return {
        ...state,
        totalSerialNos: action.key++,
        keys: [...state.keys, { key: count, ...action.value }]
      }
    case ON_REMOVE_SERIAL_NO:
      return {
        ...state,
        totalSerialNos: state.totalSerialNos--,
        keys: state.keys.filter(({ key }) => key !== action.key)
      }
    case ON_CLEAR:
      return {
        ...state,
        totalSerialNos: 0,
        keys: [],
        brandsValue: null,
        modelValue: null,
        modelSelected: null
      }
    default:
      return state
  }
}

export default serialNo
