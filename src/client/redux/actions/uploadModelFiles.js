import service from '../api/uploadModalFilesService'
import {
  GET_MODEL_DETAILS,
  SET_EDITING_MODAL_VALUES,
  HANDLE_FILENAME_CHANGE,
  ADD_UPLOAD_FILES,
  REMOVE_IMAGE,
  CLEAR_IMAGE_ARRAY,
  IS_LOADING
} from 'constants/uploadModelFile'

export const getModelDetails = model_id => {
  return {
    type: GET_MODEL_DETAILS,
    promise: service.getModelDetails(model_id)
  }
}

export const setEditingModalValues = (val, modalIndex) => {
  return {
    type: SET_EDITING_MODAL_VALUES,
    modalIndex,
    val
  }
}

export const handlleFilenameChange = val => {
  return {
    type: HANDLE_FILENAME_CHANGE,
    val
  }
}

export const addToUploadFilesArray = (fileList, fileObj) => {
  return {
    type: ADD_UPLOAD_FILES,
    fileList,
    fileObj
  }
}

export const imageRemove = uid => {
  return {
    type: REMOVE_IMAGE,
    uid
  }
}

export const clearUploadFilesArray = () => {
  return {
    type: CLEAR_IMAGE_ARRAY
  }
}
export const handleIsLoading = isLoading => {
  return {
    type: IS_LOADING,
    isLoading
  }
}
