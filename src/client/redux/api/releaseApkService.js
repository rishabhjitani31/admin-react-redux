import FetchBase from './FetchBase'
import { appServiceName } from 'utils/environment'
import { getLocalStorageData } from 'utils/localStorage'

class Service extends FetchBase {
  get url() {
    return appServiceName
  }
  defaultHeaders() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('sessionToken')
    }
  }

  getReleaseApkList() {
    const data = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data
    }
    return this.rest('apkList', options)
  }

  uploadApk(data) {
    const formData = new FormData()
    formData.append('apk_file', data.file)
    return fetch(`${appServiceName}/releseapk`, {
      method: 'POST',
      body: formData
    })
  }

  publishApk(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'GET',
      data: { ...data, ...ids }
    }
    return this.rest('publishApk', options)
  }

  releaseApkAdd(data) {
    const ids = getLocalStorageData(['staff_id', 'community_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('save-release-apk', options)
  }
  apkDownload(data) {
    const ids = getLocalStorageData(['staff_id'])
    const options = {
      method: 'POST',
      data: { ...data, ...ids }
    }
    return this.rest('api/staff/v1/apkDownload', options)
  }
}

const inst = new Service()
export default inst
