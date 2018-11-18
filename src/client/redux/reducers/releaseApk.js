import {
  GET_RELEASEAPK_DATA_FAILURE,
  GET_RELEASEAPK_DATA_REQUEST,
  GET_RELEASEAPK_DATA_SUCCESS,
  GET_RELEASEAPK_VISIBLE,
  UPLOAD_RELEASEAPK_FILE,
  RESET_APK_FORM,
  DISABLE_APK_UPLOAD,
  SET_FILE_LIST
} from 'constants/releaseApk'

const releaseApk = (
  state = {
    isFetching: false,
    releaseApkList: [],
    error: null,
    visible: false,
    record: null,
    showForm: false,
    apkData: {},
    apkURL: '',
    isUploading: false,
    fileList: []
  },
  action
) => {
  switch (action.type) {
    case GET_RELEASEAPK_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_RELEASEAPK_DATA_SUCCESS:
      return {
        ...state,
        releaseApkList: action.response.data || [],
        isFetching: false
      }
    case GET_RELEASEAPK_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_RELEASEAPK_VISIBLE:
      return { ...state, visible: action.visible, record: action.record }
    case UPLOAD_RELEASEAPK_FILE:
      return {
        ...state,
        showForm: true,
        apkData: action.data || {},
        apkURL: action.url || ''
      }
    case DISABLE_APK_UPLOAD:
      return {
        ...state,
        isUploading: action.value
      }
    case RESET_APK_FORM:
      return {
        ...state,
        showForm: false,
        apkData: {},
        apkURL: ''
      }
    case SET_FILE_LIST:
      return {
        ...state,
        fileList: action.value || []
      }
    default:
      return state
  }
}

export default releaseApk
