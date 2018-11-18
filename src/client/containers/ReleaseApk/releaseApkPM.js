import { message } from 'antd'
import service from 'api/releaseApkService'

class ReleaseApkPM {
  constructor(props) {
    this.props = props
  }

  fetch() {
    this.props.getReleaseApkList()
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  showEditPopup = record => {
    this.props.getReleaseApkVisible(true, record)
  }

  handleModalCancel = form => {
    if (!this.props.isUploading) {
      this.props.getReleaseApkVisible(false, null)
      this.props.resetApkForm()
      form.resetFields()
      this.props.setFileList() //reset fileList
    }
  }
  handleChange = ({ fileList }) => {
    //set fileList
    this.props.setFileList(fileList)
  }
  upload = data => {
    this.props.disableApkUpload(true)
    service
      .uploadApk(data)
      .then(response => response.json())
      .then(response => {
        this.props.disableApkUpload(false)
        if (response.success === 1) {
          this.props.uploadApk(response.data, response.url)
        } else {
          message.error(response.message)
        }
      })
  }

  handleSubmit = form => {
    form.validateFields(async (err, values) => {
      if (!err) {
        this.props.disableApkUpload(true)
        values.app_id = this.props.apkData.app_id
        values.url = this.props.apkURL
        try {
          const response = await service.releaseApkAdd(values)
          this.props.disableApkUpload(false)
          if (response.success === 1) {
            message.success('Apk added Successfully', 3)
          } else {
            message.success(response.message)
          }
          this.handleModalCancel(form)
          this.fetch()
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }
  updateDownloadcount = async ({ version_number, app_id }) => {
    try {
      const response = await service.apkDownload({ version_number, app_id })
      if (response.success === 1) {
        var link = document.createElement('a')
        link.download = response.data.path.split('/').pop()
        link.href = response.data.path
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        message.success(response.message, 5)
        this.fetch()
      }
    } catch (error) {
      message.error('Error!', 3)
      console.log(error)
    }
  }

  publishApk = async record => {
    let values = {
      id: record.id,
      app_id: record.app_id,
      token: record.token
    }
    try {
      const response = await service.publishApk(values)
      if (response.success === 1) {
        this.fetch()
        message.success('Apk published successfully', 3)
      } else {
        message.success('Error! Please try again.', 3)
      }
    } catch (error) {
      message.error('Error!', 3)
    }
  }
}
export default ReleaseApkPM
