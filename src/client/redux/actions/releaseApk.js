import service from 'api/releaseApkService'
import {
  GET_RELEASEAPK_DATA,
  GET_RELEASEAPK_VISIBLE,
  UPLOAD_RELEASEAPK_FILE,
  DISABLE_APK_UPLOAD,
  RESET_APK_FORM,
  SET_FILE_LIST
} from 'constants/releaseApk'

export const getReleaseApkList = () => {
  return {
    type: GET_RELEASEAPK_DATA,
    promise: service.getReleaseApkList()
  }
}

export const getReleaseApkVisible = (visible, record) => {
  return {
    type: GET_RELEASEAPK_VISIBLE,
    visible,
    record
  }
}

export const uploadApk = (data, url) => {
  return {
    type: UPLOAD_RELEASEAPK_FILE,
    data,
    url
  }
}

export const resetApkForm = () => {
  return {
    type: RESET_APK_FORM
  }
}

export const disableApkUpload = value => {
  return {
    type: DISABLE_APK_UPLOAD,
    value
  }
}

export const setFileList = value => {
  return {
    type: SET_FILE_LIST,
    value
  }
}
