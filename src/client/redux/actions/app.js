import service from 'api/appService'
import {
  GET_APP_DATA,
  GET_APP_VISIBLE,
  APP_IMAGE_UPLOAD,
  ON_SUBMIT
} from 'constants/app'

export const getAppList = () => {
  return {
    type: GET_APP_DATA,
    promise: service.getAppList()
  }
}

export const getAppVisible = (visible, record) => {
  return {
    type: GET_APP_VISIBLE,
    visible,
    record
  }
}
export const appImageUpload = (fileList, loading, image_urls) => {
  return {
    type: APP_IMAGE_UPLOAD,
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
