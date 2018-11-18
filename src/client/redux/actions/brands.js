import service from 'api/brandsService'
import {
  GET_BRANDS_DATA,
  GET_BRANDS_VISIBLE,
  BRANDS_IMAGE_UPLOAD,
  ON_SUBMIT,
  ON_REMOVE_IMAGE
} from 'constants/brands'

export const getBrandsList = data => {
  return {
    type: GET_BRANDS_DATA,
    promise: service.getBrandsList(data)
  }
}

export const getBrandsVisible = (visible, record) => {
  return {
    type: GET_BRANDS_VISIBLE,
    visible,
    record
  }
}
export const brandImageUpload = (fileList, loading, image_urls) => {
  return {
    type: BRANDS_IMAGE_UPLOAD,
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
export const removeImage = data => {
  return {
    type: ON_REMOVE_IMAGE,
    data
  }
}
