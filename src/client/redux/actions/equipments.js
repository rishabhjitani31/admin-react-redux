import service from '../api/equipmentsService'
import {
  TOGGLE_EQUIPMENTS_HANDLE_MODAL,
  SET_SELECTED_IMAGE_TO_UPLOAD,
  GET_EQUIPMENTS_DATA,
  TOGGLE_EQUIPMKENTS_MODAL_FOR_EDIT,
  TOGGLE_ADD_ISSUES_MODAL,
  GET_DEFAULT_ISSUES_LIST,
  SET_ADD_ISSUES_SELECTED_ROWS,
  HANDLE_ISSUE_TITLE_CHANGE,
  TOGGLE_ADD_UPDATE_ISSUE_FORM,
  SET_SELECTED_ISSUE_EDITABLE,
  CANCEL_ISSUE_EDITING,
  HANDLE_EDIT_ISSUE_CHANGE,
  HANDLE_REMOVE_FILE,
  REMOVE_SELECTED_IMAGE_API
} from 'constants/equipments'

export const getEquipmentsList = () => {
  return {
    type: GET_EQUIPMENTS_DATA,
    promise: service.getEquipmentsData()
  }
}

export const toggleEquipmentToggleModal = usage => {
  return {
    type: TOGGLE_EQUIPMENTS_HANDLE_MODAL,
    usage
  }
}

export const setSelectedImageToUpload = (image, fileListData) => {
  return {
    type: SET_SELECTED_IMAGE_TO_UPLOAD,
    image,
    fileListData
  }
}

export const toggleEquipmentsForEdit = (fileList, data) => {
  return {
    type: TOGGLE_EQUIPMKENTS_MODAL_FOR_EDIT,
    fileList,
    data
  }
}

export const toggleAddIssuesModal = rowData => {
  return {
    type: TOGGLE_ADD_ISSUES_MODAL,
    rowData
  }
}

export const getDefaultIssuesList = () => {
  return {
    type: GET_DEFAULT_ISSUES_LIST,
    promise: service.getDefaultIssuesList()
  }
}

export const setAddIssuesSelectedRows = selectedRows => {
  return {
    type: SET_ADD_ISSUES_SELECTED_ROWS,
    selectedRows
  }
}

export const handleIssueTitleChange = title => {
  return {
    type: HANDLE_ISSUE_TITLE_CHANGE,
    title
  }
}

export const toggleaddUpdateForm = addIssueForm => {
  return {
    type: TOGGLE_ADD_UPDATE_ISSUE_FORM,
    addIssueForm
  }
}

export const editCurrentIssue = (rowData, rowIndex) => {
  return {
    type: SET_SELECTED_ISSUE_EDITABLE,
    rowData,
    rowIndex
  }
}

export const cancelIssueEditing = () => {
  return {
    type: CANCEL_ISSUE_EDITING
  }
}

export const handleEditInputChange = val => {
  return {
    type: HANDLE_EDIT_ISSUE_CHANGE,
    val
  }
}

export const handleRemoveFile = () => {
  return {
    type: HANDLE_REMOVE_FILE
  }
}

export const removeSelectedImageApi = data => {
  return {
    type: REMOVE_SELECTED_IMAGE_API,
    promise: service.removeEquipmentImage(data)
  }
}
