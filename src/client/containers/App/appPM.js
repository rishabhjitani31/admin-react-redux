import { message } from 'antd'
import service from 'api/appService'
import moment from 'moment'

class AppPM {
  constructor(props) {
    this.props = props
  }

  fetch() {
    this.props.getAppList()
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  showEditPopup = record => {
    if (record && record.icon_url && record.icon_url.length) {
      const fileList = [
        {
          uid: '1',
          status: 'done',
          url: record.icon_url
        }
      ]

      this.props.appImageUpload(fileList, false, [record.icon_url])
    }
    this.props.getAppVisible(true, record)
  }
  handleRemove = async () => {
    const data = {
      app_id: this.props.record.app_id,
      icon_url: this.props.record.icon_url
    }
    try {
      const response = await service.removeAppImage(data)
      this.props.getAppsVisible(true, response.data[0])
      this.props.appImageUpload(null, false, '')
      document.getElementById('input-search').value = ''
      this.fetch()
      message.success('Remove Successfully', 3)
    } catch (error) {
      message.error('Error!', 3)
    }
  }

  getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  handleUpload = info => {
    if (info.file.status === 'uploading') {
      this.props.appImageUpload(info.fileList, true, [])
      return
    }

    this.getBase64(info.file.originFileObj, imageUrl => {
      const image_urls = []
      image_urls.push(imageUrl.split(',')[1])
      this.props.appImageUpload(info.fileList, false, image_urls)
    })
  }
  handleModalCancel = form => {
    form.resetFields()
    this.props.getAppVisible(false, null)
    this.props.appImageUpload(null, false, '')
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        this.props.isLoading(true)
        const data = {
          date_created: moment().format('LT'),
          ...values
        }
        try {
          if (this.props.record) {
            let url =
              this.props.image_urls.length > 0 &&
              this.props.image_urls[0].indexOf('s3.us-west-1.amazonaws.com')
            if (url > 0) {
              data['url'] = this.props.image_urls
            } else {
              data['icon_url'] = this.props.image_urls
            }
            data.app_id = this.props.record.app_id
            await service.appAdd(data)
            message.success('Edited Successfully', 3)
          } else {
            data['icon_url'] = this.props.image_urls
            await service.appAdd(data)
            message.success('Added Successfully', 3)
          }
          this.props.isLoading(false)
          this.handleModalCancel()
          document.getElementById('input-search').value = ''
          this.fetch()
          form.resetFields()
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }
}
export default AppPM
