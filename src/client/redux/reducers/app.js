import {
  GET_APP_DATA_FAILURE,
  GET_APP_DATA_REQUEST,
  GET_APP_DATA_SUCCESS,
  GET_APP_VISIBLE,
  APP_IMAGE_UPLOAD,
  ON_SUBMIT
} from 'constants/app'

const app = (
  state = {
    isFetching: false,
    appList: [],
    error: null,
    visible: false,
    record: null,
    fileList: [],
    loading: false,
    image_urls: [],
    isLoading: false
  },
  action
) => {
  switch (action.type) {
    case GET_APP_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_APP_DATA_SUCCESS:
      return {
        ...state,
        appList: action.response.data || [],
        isFetching: false
      }
    case GET_APP_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_APP_VISIBLE:
      return { ...state, visible: action.visible, record: action.record }
    case APP_IMAGE_UPLOAD:
      return {
        ...state,
        fileList: action.fileList,
        loading: action.loading,
        image_urls: action.image_urls
      }
    case ON_SUBMIT:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}

export default app
