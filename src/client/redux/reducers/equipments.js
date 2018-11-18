import {
  GET_EQUIPMENTS_DATA_REQUEST,
  GET_EQUIPMENTS_DATA_SUCCESS,
  GET_EQUIPMENTS_DATA_FAILURE,
  TOGGLE_EQUIPMENTS_HANDLE_MODAL,
  SET_SELECTED_IMAGE_TO_UPLOAD,
  TOGGLE_EQUIPMKENTS_MODAL_FOR_EDIT,
  TOGGLE_ADD_ISSUES_MODAL,
  GET_DEFAULT_ISSUES_LIST_REQUEST,
  GET_DEFAULT_ISSUES_LIST_SUCCESS,
  GET_DEFAULT_ISSUES_LIST_FAILURE,
  SET_ADD_ISSUES_SELECTED_ROWS,
  HANDLE_ISSUE_TITLE_CHANGE,
  TOGGLE_ADD_UPDATE_ISSUE_FORM,
  SET_SELECTED_ISSUE_EDITABLE,
  CANCEL_ISSUE_EDITING,
  HANDLE_EDIT_ISSUE_CHANGE,
  HANDLE_REMOVE_FILE,
  REMOVE_SELECTED_IMAGE_API_REQUEST,
  REMOVE_SELECTED_IMAGE_API_SUCCESS,
  REMOVE_SELECTED_IMAGE_API_FAILURE
} from 'constants/equipments'
import moment from 'moment'

const initEquipmentsState = {
  isEquipmentsLoading: false,
  equipmentsList: [],
  isHandleEquipmentsModalOpen: false,
  equipmentsHandleModalUsage: '',
  selectedImageToUpload: '',
  fileList: [],
  selectedEquipment: {},
  isAddIssueModalOpen: false,
  defaultIssuesList: [],
  isLoadingIssuesList: false,
  selectedAddIssueData: {},
  selectedRowKeys: [],
  addUpdateIssueTitle: '',
  isAddUpdateIssueFormVisible: false,
  selectedIssueRowData: {},
  selectedIssueRowIndex: -1,
  issueEditVal: '',
  visible: false,
  isRemovingImage: false,
  fileRemoveStatus: {}
}

export default (state = initEquipmentsState, action) => {
  switch (action.type) {
    case GET_EQUIPMENTS_DATA_REQUEST: {
      return { ...state, isEquipmentsLoading: !state.isEquipmentsLoading }
    }
    case GET_EQUIPMENTS_DATA_SUCCESS:
      return {
        ...state,
        isEquipmentsLoading: !state.isEquipmentsLoading,
        equipmentsList: action.response.data || []
      }
    case GET_EQUIPMENTS_DATA_FAILURE:
      return { ...state, isEquipmentsLoading: !state.isEquipmentsLoading }
    case TOGGLE_EQUIPMENTS_HANDLE_MODAL:
      return {
        ...state,
        isHandleEquipmentsModalOpen: !state.isHandleEquipmentsModalOpen,
        equipmentsHandleModalUsage: action.usage,
        selectedEquipment: {},
        selectedImageToUpload: '',
        fileList: []
      }
    case SET_SELECTED_IMAGE_TO_UPLOAD: {
      return {
        ...state,
        selectedImageToUpload: action.image,
        fileList: [...state.fileList, action.fileListData]
      }
    }
    case TOGGLE_EQUIPMKENTS_MODAL_FOR_EDIT:
      return {
        ...state,
        fileList: action.fileList.url
          ? [...state.fileList, action.fileList]
          : [],
        selectedEquipment: action.data,
        isHandleEquipmentsModalOpen: !state.isHandleEquipmentsModalOpen
      }
    case TOGGLE_ADD_ISSUES_MODAL:
      return {
        ...state,
        isAddIssueModalOpen: !state.isAddIssueModalOpen,
        selectedAddIssueData: action.rowData,
        selectedRowKeys: action.rowData.issue_ids
      }
    case GET_DEFAULT_ISSUES_LIST_REQUEST:
      return {
        ...state,
        isLoadingIssuesList: !state.isLoadingIssuesList
      }
    case GET_DEFAULT_ISSUES_LIST_SUCCESS:
      return {
        ...state,
        defaultIssuesList: action.response.data,
        isLoadingIssuesList: !state.isLoadingIssuesList,
        visible: false
      }
    case GET_DEFAULT_ISSUES_LIST_FAILURE:
      return {
        ...state,
        isLoadingIssuesList: !state.isLoadingIssuesList
      }
    case SET_ADD_ISSUES_SELECTED_ROWS:
      return {
        ...state,
        selectedRowKeys: action.selectedRows
      }
    case HANDLE_ISSUE_TITLE_CHANGE:
      return {
        ...state,
        addUpdateIssueTitle: action.title
      }
    case TOGGLE_ADD_UPDATE_ISSUE_FORM:
      if (state.defaultIssuesList[0].id === 'addForm') {
        const remFormArr = [...state.defaultIssuesList]
        remFormArr.shift()
        return {
          ...state,
          isAddUpdateIssueFormVisible: !state.isAddUpdateIssueFormVisible,
          defaultIssuesList: remFormArr,
          visible: false
        }
      }
      return {
        ...state,
        isAddUpdateIssueFormVisible: !state.isAddUpdateIssueFormVisible,
        defaultIssuesList: [
          {
            ...action.addIssueForm,
            date_created: moment().format()
          },
          ...state.defaultIssuesList
        ],
        visible: true
      }
    case SET_SELECTED_ISSUE_EDITABLE:
      return {
        ...state,
        selectedIssueRowData: action.rowData,
        selectedIssueRowIndex: action.rowIndex,
        visible: false
      }
    case CANCEL_ISSUE_EDITING:
      return {
        ...state,
        selectedIssueRowData: {},
        selectedIssueRowIndex: -1,
        visible: false
      }
    case HANDLE_EDIT_ISSUE_CHANGE:
      return {
        ...state,
        issueEditVal: action.val
      }

    case HANDLE_REMOVE_FILE:
      return {
        ...state,
        selectedImageToUpload: '',
        fileList: []
      }
    case REMOVE_SELECTED_IMAGE_API_REQUEST:
      return {
        ...state,
        isRemovingImage: true
      }
    case REMOVE_SELECTED_IMAGE_API_SUCCESS:
      return {
        ...state,
        isRemovingImage: false,
        fileRemoveStatus: action.response.data
      }
    case REMOVE_SELECTED_IMAGE_API_FAILURE:
      return {
        ...state,
        isRemovingImage: false,
        fileRemoveStatus: action.response.error
      }
    default:
      return state
  }
}
