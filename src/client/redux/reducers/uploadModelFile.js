import {
  GET_MODEL_DETAILS_REQUEST,
  GET_MODEL_DETAILS_SUCCESS,
  GET_MODEL_DETAILS_FAILURE,
  SET_EDITING_MODAL_VALUES,
  HANDLE_FILENAME_CHANGE,
  ADD_UPLOAD_FILES,
  REMOVE_IMAGE,
  CLEAR_IMAGE_ARRAY,
  IS_LOADING
} from 'constants/uploadModelFile'

const uploadModalDetails = {
  isModelDetailsLoading: false,
  uploadModelDetails: [],
  uploadModalFailErr: '',
  modalToEditIndex: -1,
  modalToEditValue: {},
  fileName: '',
  uploadFilesArray: [],
  fileList: [],
  isLoading: false
}

export default (state = uploadModalDetails, action) => {
  switch (action.type) {
    case GET_MODEL_DETAILS_REQUEST: {
      return { ...state, isModelDetailsLoading: !state.isModelDetailsLoading }
    }
    case GET_MODEL_DETAILS_SUCCESS:
      return {
        ...state,
        isModelDetailsLoading: !state.isModelDetailsLoading,
        uploadModelDetails: action.response.data || []
      }
    case GET_MODEL_DETAILS_FAILURE:
      return {
        ...state,
        isModelDetailsLoading: !state.isModelDetailsLoading,
        uploadModalFailErr: action.error
      }
    case SET_EDITING_MODAL_VALUES:
      return {
        ...state,
        modalToEditIndex: action.modalIndex,
        modalToEditValue: action.val
      }
    case HANDLE_FILENAME_CHANGE:
      return {
        ...state,
        fileName: action.val
      }
    case ADD_UPLOAD_FILES: {
      let uploadFilesArray = []
      if (action.fileObj) {
        uploadFilesArray = [...state.uploadFilesArray, action.fileObj]
      } else uploadFilesArray = [...state.uploadFilesArray]
      return {
        ...state,
        fileList: action.fileList,
        uploadFilesArray
      }
    }

    case REMOVE_IMAGE: {
      const uploadFilesArray = state.uploadFilesArray.filter(
        imageObj => imageObj.uid !== action.uid
      )
      const fileList = state.fileList.filter(
        imageObj => imageObj.uid !== action.uid
      )
      return {
        ...state,
        uploadFilesArray,
        fileList
      }
    }
    case CLEAR_IMAGE_ARRAY:
      return {
        ...state,
        uploadFilesArray: [],
        fileList: []
      }
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}
