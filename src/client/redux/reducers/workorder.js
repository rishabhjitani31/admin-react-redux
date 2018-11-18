import {
  TOGGLE_DRAWER,
  GET_SELECTED_WORK_ORDER_DATA_FAILURE,
  GET_SELECTED_WORK_ORDER_DATA_REQUEST,
  GET_SELECTED_WORK_ORDER_DATA_SUCCESS,
  GET_WORK_ORDER_VISIBLE,
  GET_OUTLET_DATA_FAILURE,
  GET_OUTLET_DATA_REQUEST,
  GET_OUTLET_DATA_SUCCESS,
  GET_STAFF_DATA_FAILURE,
  GET_STAFF_DATA_REQUEST,
  GET_STAFF_DATA_SUCCESS,
  GET_ISSUES_DATA_FAILURE,
  GET_ISSUES_DATA_REQUEST,
  GET_ISSUES_DATA_SUCCESS,
  GET_EQUIPMENTS_DATA_FAILURE,
  GET_EQUIPMENTS_DATA_REQUEST,
  GET_EQUIPMENTS_DATA_SUCCESS,
  GET_BRANDS_DATA_FAILURE,
  GET_BRANDS_DATA_REQUEST,
  GET_BRANDS_DATA_SUCCESS,
  GET_MODELS_DATA_FAILURE,
  GET_MODELS_DATA_REQUEST,
  GET_MODELS_DATA_SUCCESS,
  GET_SRNOS_DATA_FAILURE,
  GET_SRNOS_DATA_REQUEST,
  GET_SRNOS_DATA_SUCCESS,
  RESET_BRANDS_DATA,
  RESET_SRNOS_DATA,
  RESET_MODELS_DATA,
  RESET_EQUIPMENTS_DATA,
  RESET_STAFF_DATA,
  WORK_ORDER_IMAGE_UPLOAD,
  ON_SUBMIT,
  CHANGE_TITLE,
  CHANGE_TITLE_FIELDS,
  CHANGE_COMMENT_INPUT,
  SEND_COMMENT_SUCCESS,
  SEND_COMMENT_FAILURE,
  SEND_COMMENT_REQUEST,
  CHANGE_CUSTOMER,
  CHANGE_CUSTOMER_FIELDS,
  CHANGE_OUTLET,
  CHANGE_OUTLET_FIELDS,
  CHANGE_EQUIPMENT,
  CHANGE_EQUIPMENT_FIELDS,
  CHANGE_BRAND,
  CHANGE_BRAND_FIELDS,
  CHANGE_MODEL,
  CHANGE_MODEL_FIELDS,
  CHANGE_SRNOS,
  CHANGE_SRNOS_FIELDS,
  CHANGE_ASSIGNEE,
  CHANGE_ASSIGNEE_FIELDS,
  GET_MANUALS_MODAL_VISIBLE,
  GET_REPORT_MODAL_VISIBLE,
  CHANGE_SERVICE_TYPE_CHECKBOX,
  GET_PARTS_INPUT_VISIBLE,
  CHANGE_PARTS_DATA,
  CHANGE_QTY,
  CHANGE_PART_NO,
  CHANGE_DESCRIPTION,
  REMOVE_TICKET_COUNT,
  GET_WORK_ORDER_UNREAD_COUNT,
  GET_TABLE_PAGINATION,
  GET_WORK_ORDER_DATA_PAGINATION_REQUEST,
  GET_WORK_ORDER_DATA_PAGINATION_FAILURE,
  GET_WORK_ORDER_DATA_PAGINATION_SUCCESS,
  CHANGE_TAB_ACTIVE_KEY,
  DISABLE_UPLOAD
} from 'constants/workorder'
import { SOCKET_TICKET_RECEIVED } from 'constants/socket'
import { getLocalStorageData } from 'utils/localStorage'

const workorder = (
  state = {
    isFetching: false,
    workorderlist: [],
    error: null,
    visible: false,
    orderDetail: {},
    isOrderFetching: false,
    isOutletFetching: false,
    modalVisibe: false,
    outletList: [],
    staffList: [],
    isStaffFetching: false,
    issuesList: [],
    isIssuesFetching: false,
    equipmentsList: [],
    isEquipmentsFetching: false,
    srnosList: [],
    isSrnosFetching: false,
    modelsList: [],
    isModelsFetching: false,
    brandsList: [],
    isBrandsFetching: false,
    fileList: [],
    loading: false,
    image_urls: [],
    isLoading: false,
    changeTitle: false,
    newTitleId: undefined,
    newTitle: '',
    isCommentFetching: false,
    commentValue: '',
    changeCustomer: false,
    newCustomerId: undefined,
    changeOutlet: false,
    newOutletId: undefined,
    changeSrno: false,
    changeModel: false,
    changeBrand: false,
    changeEquipment: false,
    newEquipmentId: undefined,
    newBrandId: undefined,
    newModelId: undefined,
    newSrnoId: undefined,
    newEquipment: '',
    newBrand: '',
    newModel: '',
    newSrno: '',
    changeAssignee: false,
    newAssigneeId: undefined,
    manualsModalVisibe: false,
    reportDetail: {},
    reportModalVisible: false,
    serviceType: [1],
    partsReplaced: [],
    showPartsInpuFields: false,
    description: '',
    partNo: '',
    quantity: '',
    workOrderCount: 0,
    tableSettings: {
      position: 'both',
      showQuickJumper: true,
      pageSize: 20,
      defaultCurrent: 1,
      current: 1,
      total: 0,
      showSizeChanger: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
    },
    activeKey: '1',
    uploading: false
  },
  action
) => {
  switch (action.type) {
    case GET_WORK_ORDER_DATA_PAGINATION_REQUEST:
      return { ...state, isFetching: true }
    case GET_WORK_ORDER_DATA_PAGINATION_SUCCESS: {
      let tableSettings = { ...state.tableSettings }
      tableSettings.total = action.response.count
      tableSettings.pageSize = action.response.rows
      tableSettings.defaultCurrent = action.response.page + 1
      tableSettings.current = action.response.page + 1
      return {
        ...state,
        workorderlist: action.response.data,
        tableSettings,
        isFetching: false
      }
    }
    case GET_WORK_ORDER_DATA_PAGINATION_FAILURE: {
      return { ...state, error: action.error, isFetching: false }
    }
    case TOGGLE_DRAWER: {
      if (action.visible) {
        return { ...state, visible: action.visible, activeKey: '1' }
      } else {
        return {
          ...state,
          visible: action.visible,
          activeKey: '1',
          orderDetail: {}
        }
      }
    }
    case GET_SELECTED_WORK_ORDER_DATA_REQUEST:
      return { ...state, isOrderFetching: true }

    case GET_SELECTED_WORK_ORDER_DATA_SUCCESS:
      return {
        ...state,
        orderDetail: action.response.data || {},
        isOrderFetching: false
      }
    case GET_SELECTED_WORK_ORDER_DATA_FAILURE:
      return { ...state, error: action.error, isOrderFetching: false }
    case GET_WORK_ORDER_VISIBLE:
      return { ...state, modalVisibe: action.visible }
    case GET_OUTLET_DATA_REQUEST:
      return { ...state, isOutletFetching: true }
    case GET_OUTLET_DATA_SUCCESS:
      return {
        ...state,
        outletList: action.response.apartments || [],
        isOutletFetching: false
      }
    case GET_OUTLET_DATA_FAILURE:
      return { ...state, error: action.error, isOutletFetching: false }
    case GET_STAFF_DATA_REQUEST:
      return { ...state, isStaffFetching: true }
    case GET_STAFF_DATA_SUCCESS:
      return {
        ...state,
        staffList: action.response.data || [],
        isStaffFetching: false
      }
    case GET_STAFF_DATA_FAILURE:
      return { ...state, error: action.error, isStaffFetching: false }
    case GET_ISSUES_DATA_REQUEST:
      return { ...state, isIssuesFetching: true }
    case GET_ISSUES_DATA_SUCCESS:
      return {
        ...state,
        issuesList: action.response.data || [],
        isIssuesFetching: false
      }
    case GET_ISSUES_DATA_FAILURE:
      return { ...state, error: action.error, isIssuesFetching: false }
    case GET_EQUIPMENTS_DATA_REQUEST:
      return { ...state, isEquipmentsFetching: true }
    case GET_EQUIPMENTS_DATA_SUCCESS:
      return {
        ...state,
        equipmentsList: action.response.data || [],
        isEquipmentsFetching: false
      }
    case GET_EQUIPMENTS_DATA_FAILURE:
      return { ...state, error: action.error, isEquipmentsFetching: false }
    case GET_SRNOS_DATA_REQUEST:
      return { ...state, isSrnosFetching: true }
    case GET_SRNOS_DATA_SUCCESS:
      return {
        ...state,
        srnosList: action.response.data || [],
        isSrnosFetching: false
      }
    case GET_SRNOS_DATA_FAILURE:
      return { ...state, error: action.error, isSrnosFetching: false }
    case GET_MODELS_DATA_REQUEST:
      return { ...state, isModelsFetching: true }
    case GET_MODELS_DATA_SUCCESS:
      return {
        ...state,
        modelsList: action.response.data || [],
        isModelsFetching: false
      }
    case GET_MODELS_DATA_FAILURE:
      return { ...state, error: action.error, isModelsFetching: false }
    case GET_BRANDS_DATA_REQUEST:
      return { ...state, isBrandsFetching: true }
    case GET_BRANDS_DATA_SUCCESS:
      return {
        ...state,
        brandsList: action.response.data || [],
        isBrandsFetching: false
      }
    case GET_BRANDS_DATA_FAILURE:
      return { ...state, error: action.error, isBrandsFetching: false }
    case RESET_BRANDS_DATA:
      return { ...state, brandsList: [] }
    case RESET_MODELS_DATA:
      return { ...state, modelsList: [] }
    case RESET_SRNOS_DATA:
      return { ...state, srnosList: [] }
    case RESET_EQUIPMENTS_DATA:
      return { ...state, equipmentsList: [] }
    case RESET_STAFF_DATA:
      return { ...state, staffList: [] }
    case WORK_ORDER_IMAGE_UPLOAD:
      return {
        ...state,
        fileList: [...action.fileList],
        loading: action.loading,
        image_urls: action.remove
          ? [...action.image_urls]
          : [...state.image_urls, ...action.image_urls]
      }
    case ON_SUBMIT:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case CHANGE_TITLE:
      return {
        ...state,
        changeTitle: action.changeTitle
      }
    case CHANGE_TITLE_FIELDS:
      return {
        ...state,
        newTitle: action.input && !action.reset ? action.value : '',
        newTitleId: action.input || action.reset ? undefined : action.value
      }
    case CHANGE_COMMENT_INPUT:
      return {
        ...state,
        commentValue: action.value
      }
    case SEND_COMMENT_REQUEST:
      return { ...state, isCommentFetching: true }
    case SEND_COMMENT_SUCCESS:
      return {
        ...state,
        isCommentFetching: false
      }
    case SEND_COMMENT_FAILURE:
      return { ...state, error: action.error, isCommentFetching: false }
    case CHANGE_CUSTOMER:
      return {
        ...state,
        changeCustomer: action.changeCustomer
      }
    case CHANGE_CUSTOMER_FIELDS:
      return {
        ...state,
        newCustomerId: action.input || action.reset ? undefined : action.value
      }
    case CHANGE_OUTLET:
      return {
        ...state,
        changeOutlet: action.changeOutlet
      }
    case CHANGE_OUTLET_FIELDS:
      return {
        ...state,
        newOutletId: action.input || action.reset ? undefined : action.value
      }

    case CHANGE_EQUIPMENT:
      return {
        ...state,
        changeEquipment: action.changeEquipment
      }
    case CHANGE_EQUIPMENT_FIELDS:
      return {
        ...state,
        newEquipment: action.input && !action.reset ? action.value : '',
        newEquipmentId: action.input || action.reset ? undefined : action.value
      }

    case CHANGE_BRAND:
      return {
        ...state,
        changeBrand: action.changeBrand
      }
    case CHANGE_BRAND_FIELDS:
      return {
        ...state,
        newBrand: action.input && !action.reset ? action.value : '',
        newBrandId: action.input || action.reset ? undefined : action.value
      }

    case CHANGE_MODEL:
      return {
        ...state,
        changeModel: action.changeModel
      }
    case CHANGE_MODEL_FIELDS:
      return {
        ...state,
        newModel: action.input && !action.reset ? action.value : '',
        newModelId: action.input || action.reset ? undefined : action.value
      }

    case CHANGE_SRNOS:
      return {
        ...state,
        changeSrno: action.changeSrno
      }
    case CHANGE_SRNOS_FIELDS:
      return {
        ...state,
        newSrno: action.input && !action.reset ? action.value : '',
        newSrnoId: action.input || action.reset ? undefined : action.value
      }
    case CHANGE_ASSIGNEE:
      return {
        ...state,
        changeAssignee: action.changeAssignee
      }
    case CHANGE_ASSIGNEE_FIELDS:
      return {
        ...state,
        newAssigneeId: action.input || action.reset ? undefined : action.value
      }
    case GET_MANUALS_MODAL_VISIBLE:
      return { ...state, manualsModalVisibe: action.visible }
    case GET_REPORT_MODAL_VISIBLE:
      return {
        ...state,
        reportDetail: action.reportDetail,
        reportModalVisible: action.reportModalVisible,
        serviceType: action.reportDetail.receipt_id
          ? action.reportDetail.service_type
          : [1],
        partsReplaced: action.reportDetail.receipt_id
          ? action.reportDetail.parts_data
          : []
      }
    case CHANGE_SERVICE_TYPE_CHECKBOX:
      return { ...state, serviceType: action.value }
    case GET_PARTS_INPUT_VISIBLE:
      return { ...state, showPartsInpuFields: action.value }
    case CHANGE_PARTS_DATA:
      return { ...state, partsReplaced: action.value }
    case CHANGE_QTY:
      return { ...state, quantity: action.value }
    case CHANGE_PART_NO:
      return { ...state, partNo: action.value }
    case CHANGE_DESCRIPTION:
      return { ...state, description: action.value }

    case SOCKET_TICKET_RECEIVED:
      if (
        getLocalStorageData(['last_customer']).last_customer === 0 ||
        getLocalStorageData(['last_customer']).last_customer ===
          action.payload.customer_id
      ) {
        let workorderlist = [...state.workorderlist]
        let index = workorderlist.findIndex(
          x => x.ticket_id === action.payload.ticket_id
        )
        action.payload['count'] = 1
        if (index >= 0) {
          workorderlist[index] = action.payload
          if (
            state.orderDetail &&
            state.orderDetail.ticket_id === action.payload.ticket_id
          ) {
            action.payload['count'] = 0
            return {
              ...state,
              workorderlist,
              orderDetail: action.payload
            }
          }
          return {
            ...state,
            workorderlist,
            workOrderCount: ++state.workOrderCount
          }
        } else {
          workorderlist.unshift(action.payload)
          return {
            ...state,
            workorderlist,
            workOrderCount: ++state.workOrderCount
          }
        }
      } else {
        return {
          ...state
        }
      }
    case REMOVE_TICKET_COUNT: {
      let workorderlist = [...state.workorderlist]
      let index = workorderlist.findIndex(x => x.ticket_id === action.value)
      if (index >= 0) {
        workorderlist[index].count = 0
      }
      return {
        ...state,
        workorderlist
      }
    }
    case GET_WORK_ORDER_UNREAD_COUNT:
      return {
        ...state,
        workOrderCount: parseInt(action.value) || 0
      }
    case GET_TABLE_PAGINATION:
      return { ...state, tableSettings: action.value }
    case CHANGE_TAB_ACTIVE_KEY:
      return { ...state, activeKey: action.value }
    case DISABLE_UPLOAD:
      return { ...state, uploading: action.value }
    default:
      return state
  }
}

export default workorder
