import {
  GET_CUSTOMER_DATA_FAILURE,
  GET_CUSTOMER_DATA_REQUEST,
  GET_CUSTOMER_DATA_SUCCESS,
  GET_CUSTOMER_VISIBLE,
  CUSTOMER_IMAGE_UPLOAD,
  ON_SUBMIT,
  REMOVE_IMAGE
} from 'constants/customer'

const customer = (
  state = {
    isFetching: false,
    customerlist: [],
    error: null,
    visible: false,
    record: null,
    sucessMessage: null,
    errorMessage: null,
    fileList: [],
    loading: false,
    image_urls: [],
    isLoading: false,
    removeImageData: null
  },
  action
) => {
  switch (action.type) {
    case GET_CUSTOMER_DATA_REQUEST:
      return { ...state, isFetching: true }
    case GET_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        customerlist: action.response.data || [],
        isFetching: false
      }
    case GET_CUSTOMER_DATA_FAILURE:
      return { ...state, error: action.error, isFetching: false }
    case GET_CUSTOMER_VISIBLE:
      return {
        ...state,
        visible: action.visible,
        record: action.record
      }
    case CUSTOMER_IMAGE_UPLOAD:
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
    case REMOVE_IMAGE:
      return {
        ...state,
        removeImageData: action.removeImageData
      }
    default:
      return state
  }
}

export default customer
