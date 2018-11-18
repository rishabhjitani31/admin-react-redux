import { message } from 'antd'
import service from 'api/customerService'
import moment from 'moment'

class CustomerPM {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getCustomerList()
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  showPopup = record => {
    if (record && record.image_url.length) {
      const fileList = [
        {
          uid: '1',
          status: 'done',
          url: record.thumb_url[0]
        }
      ]

      this.props.customerImageUpload(fileList, false, [])
    }
    this.props.getCustomerVisible(true, record)
  }

  handleModalCancel = form => {
    form.resetFields()
    this.props.getCustomerVisible(false, null)
    this.props.customerImageUpload(null, false, '')
    this.props.removeImage(null)
  }

  handleRemove = () => {
    if (this.props.record) {
      const removeImageData = {
        customer_id: this.props.record.customer_id,
        image_url: this.props.record.image_url[0],
        thumb_url: this.props.record.thumb_url[0]
      }
      this.props.removeImage(removeImageData)
    }
    this.props.customerImageUpload(null, false, '')
  }

  getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  handleUpload = info => {
    if (info.file.status === 'uploading') {
      this.props.customerImageUpload(info.fileList, true, [])
      return
    }
    this.getBase64(info.file.originFileObj, imageUrl => {
      const image_urls = []
      image_urls.push(imageUrl.split(',')[1])
      info.fileList[0].status = 'done'
      this.props.customerImageUpload(info.fileList, false, image_urls)
    })
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        this.props.isLoading(true)
        const data = {
          customer_name: values.customer_name,
          date_created: moment().format('LT'),
          image_urls: this.props.image_urls
        }

        if (this.props.removeImageData) {
          try {
            const response = await service.removeCustomerImage(
              this.props.removeImageData
            )
            this.props.getCustomerVisible(true, response.data[0])
          } catch (error) {
            message.error('Error!', 3)
          }
          this.props.removeImage(null)
        }

        try {
          if (this.props.record) {
            data.customer_id = this.props.record.customer_id
            await service.customerEdit(data)
            message.success('Customer Edited Successfully', 3)
          } else {
            await service.customerAdd(data)
            message.success('Customer Added Successfully', 3)
          }
          this.props.isLoading(false)
          this.handleModalCancel(form)
          document.getElementById('input-search').value = ''
          this.fetch()
          form.resetFields()
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }

  handleDeleteCustomer = async record => {
    const data = {
      customer_id: record.customer_id
    }
    try {
      await service.customerDelete(data)
      message.success('Customer Deleted Successfully', 3)
      document.getElementById('input-search').value = ''
      this.fetch()
    } catch (error) {
      message.error('Error!', 3)
    }
  }
}
export default CustomerPM
