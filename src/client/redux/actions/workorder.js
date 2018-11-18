import service from 'api/workOrderService'
import {
  TOGGLE_DRAWER,
  GET_SELECTED_WORK_ORDER_DATA,
  GET_WORK_ORDER_VISIBLE,
  GET_OUTLET_DATA,
  GET_STAFF_DATA,
  GET_ISSUES_DATA,
  GET_EQUIPMENTS_DATA,
  GET_BRANDS_DATA,
  GET_MODELS_DATA,
  GET_SRNOS_DATA,
  RESET_MODELS_DATA,
  RESET_BRANDS_DATA,
  RESET_SRNOS_DATA,
  RESET_EQUIPMENTS_DATA,
  RESET_STAFF_DATA,
  WORK_ORDER_IMAGE_UPLOAD,
  ON_SUBMIT,
  CHANGE_TITLE,
  CHANGE_TITLE_FIELDS,
  CHANGE_COMMENT_INPUT,
  SEND_COMMENT,
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
  GET_WORK_ORDER_DATA_PAGINATION,
  CHANGE_TAB_ACTIVE_KEY,
  DISABLE_UPLOAD
} from 'constants/workorder'

export const getWorkOrderListWithPagination = data => {
  return {
    type: GET_WORK_ORDER_DATA_PAGINATION,
    promise: service.getWorkOrderListWithPagination(data)
  }
}
export const toggleDrawer = visible => {
  return {
    type: TOGGLE_DRAWER,
    visible
  }
}
export const fetchWorkOrderDetail = data => {
  return {
    type: GET_SELECTED_WORK_ORDER_DATA,
    promise: service.fetchWorkOrderDetail(data)
  }
}

export const getWorkOrderVisible = visible => {
  return {
    type: GET_WORK_ORDER_VISIBLE,
    visible
  }
}

export const getOutletList = data => {
  return {
    type: GET_OUTLET_DATA,
    promise: service.getOutletList(data)
  }
}

export const getStaffList = data => {
  return {
    type: GET_STAFF_DATA,
    promise: service.getStaffList(data)
  }
}

export const getIssuesList = data => {
  return {
    type: GET_ISSUES_DATA,
    promise: service.getIssuesList(data)
  }
}

export const getEquipmentsByOutlet = data => {
  return {
    type: GET_EQUIPMENTS_DATA,
    promise: service.getEquipmentsByOutlet(data)
  }
}

export const getBrandsByOutlet = data => {
  return {
    type: GET_BRANDS_DATA,
    promise: service.getBrandsByOutlet(data)
  }
}

export const getModelsByOutlet = data => {
  return {
    type: GET_MODELS_DATA,
    promise: service.getModelsByOutlet(data)
  }
}

export const getSrnosByOutlet = data => {
  return {
    type: GET_SRNOS_DATA,
    promise: service.getSrnosByOutlet(data)
  }
}

export const resetBrandsData = () => {
  return {
    type: RESET_BRANDS_DATA
  }
}

export const resetModelsData = () => {
  return {
    type: RESET_MODELS_DATA
  }
}

export const resetSrnosData = () => {
  return {
    type: RESET_SRNOS_DATA
  }
}

export const resetStaffData = () => {
  return {
    type: RESET_STAFF_DATA
  }
}
export const resetEquipmentsData = () => {
  return {
    type: RESET_EQUIPMENTS_DATA
  }
}

export const workOrderImageUpload = (fileList, loading, image_urls, remove) => {
  return {
    type: WORK_ORDER_IMAGE_UPLOAD,
    fileList,
    loading,
    image_urls,
    remove
  }
}

export const isLoading = isLoading => {
  return {
    type: ON_SUBMIT,
    isLoading
  }
}

export const updateChangeTitleFlag = changeTitle => {
  return {
    type: CHANGE_TITLE,
    changeTitle
  }
}

export const updateTitleFieldsValue = (reset, input, value) => {
  return {
    type: CHANGE_TITLE_FIELDS,
    reset,
    input,
    value
  }
}

export const handleChangeComment = value => {
  return {
    type: CHANGE_COMMENT_INPUT,
    value
  }
}

export const sendTicketComment = data => {
  return {
    type: SEND_COMMENT,
    promise: service.sendTicketComment(data)
  }
}

export const updateChangeCustomerFlag = changeCustomer => {
  return {
    type: CHANGE_CUSTOMER,
    changeCustomer
  }
}

export const updateCustomerFieldsValue = (reset, input, value) => {
  return {
    type: CHANGE_CUSTOMER_FIELDS,
    reset,
    input,
    value
  }
}

export const updateChangeOutletFlag = changeOutlet => {
  return {
    type: CHANGE_OUTLET,
    changeOutlet
  }
}

export const updateOutletFieldsValue = (reset, input, value) => {
  return {
    type: CHANGE_OUTLET_FIELDS,
    reset,
    input,
    value
  }
}

export const updateChangeEquipmentFlag = changeEquipment => {
  return {
    type: CHANGE_EQUIPMENT,
    changeEquipment
  }
}

export const updateEquipmentFieldsValue = (reset, input, value) => {
  return {
    type: CHANGE_EQUIPMENT_FIELDS,
    reset,
    input,
    value
  }
}

export const updateChangeBrandFlag = changeBrand => {
  return {
    type: CHANGE_BRAND,
    changeBrand
  }
}

export const updateBrandFieldsValue = (reset, input, value) => {
  return {
    type: CHANGE_BRAND_FIELDS,
    reset,
    input,
    value
  }
}

export const updateChangeModelFlag = changeModel => {
  return {
    type: CHANGE_MODEL,
    changeModel
  }
}

export const updateModelFieldsValue = (reset, input, value) => {
  return {
    type: CHANGE_MODEL_FIELDS,
    reset,
    input,
    value
  }
}

export const updateChangeSrnoFlag = changeSrno => {
  return {
    type: CHANGE_SRNOS,
    changeSrno
  }
}

export const updateSrnoFieldsValue = (reset, input, value) => {
  return {
    type: CHANGE_SRNOS_FIELDS,
    reset,
    input,
    value
  }
}

export const updateChangeAssigneeFlag = changeAssignee => {
  return {
    type: CHANGE_ASSIGNEE,
    changeAssignee
  }
}

export const updateAssigneeFieldsValue = (reset, input, value) => {
  return {
    type: CHANGE_ASSIGNEE_FIELDS,
    reset,
    input,
    value
  }
}

export const getManualsModalVisible = visible => {
  return {
    type: GET_MANUALS_MODAL_VISIBLE,
    visible
  }
}

export const showReportForm = (reportModalVisible, reportDetail) => {
  return {
    type: GET_REPORT_MODAL_VISIBLE,
    reportDetail,
    reportModalVisible
  }
}

export const onserviceTypeChange = value => {
  return {
    type: CHANGE_SERVICE_TYPE_CHECKBOX,
    value
  }
}

export const showPartsDataInpuFields = value => {
  return {
    type: GET_PARTS_INPUT_VISIBLE,
    value
  }
}

export const handlePartsReplaced = value => {
  return {
    type: CHANGE_PARTS_DATA,
    value
  }
}

export const handleQtyChange = e => {
  return {
    type: CHANGE_QTY,
    value: (e && e.target.value) || ''
  }
}

export const handlePartNoChange = e => {
  return {
    type: CHANGE_PART_NO,
    value: (e && e.target.value) || ''
  }
}

export const handleDescriptionChange = e => {
  return {
    type: CHANGE_DESCRIPTION,
    value: (e && e.target.value) || ''
  }
}

export const removeTicketCount = value => {
  return {
    type: REMOVE_TICKET_COUNT,
    value
  }
}

export const getWorkOrderCount = value => {
  return {
    type: GET_WORK_ORDER_UNREAD_COUNT,
    value
  }
}

export const getPagination = value => {
  return {
    type: GET_TABLE_PAGINATION,
    value
  }
}

export const changeTabActiveKey = value => {
  return {
    type: CHANGE_TAB_ACTIVE_KEY,
    value
  }
}

export const disableUpload = value => {
  return {
    type: DISABLE_UPLOAD,
    value
  }
}
