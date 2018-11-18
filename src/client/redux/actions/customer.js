import service from 'api/customerService'
import {
  GET_CUSTOMER_DATA,
  GET_CUSTOMER_VISIBLE,
  CUSTOMER_IMAGE_UPLOAD,
  ON_SUBMIT,
  REMOVE_IMAGE
} from 'constants/customer'

export const getCustomerList = () => {
  return {
    type: GET_CUSTOMER_DATA,
    promise: service.getCustomerList()
  }
}

export const getCustomerVisible = (visible, record) => {
  return {
    type: GET_CUSTOMER_VISIBLE,
    visible,
    record
  }
}

export const customerImageUpload = (fileList, loading, image_urls) => {
  return {
    type: CUSTOMER_IMAGE_UPLOAD,
    fileList,
    loading,
    image_urls
  }
}

export const isLoading = isLoading => {
  return {
    type: ON_SUBMIT,
    isLoading
  }
}

export const removeImage = removeImageData => {
  return {
    type: REMOVE_IMAGE,
    removeImageData
  }
}
