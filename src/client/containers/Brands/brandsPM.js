import { message } from 'antd'
import service from 'api/brandsService'
import moment from 'moment'

class BrandsPM {
  constructor(props) {
    this.props = props
  }

  fetch() {
    this.props.getBrandsList()
    this.props.getEquipmentsList()
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  showEditPopup = record => {
    if (record && record.image_url && record.image_url.length) {
      const fileList = record.thumb_url.map((value, index) => {
        return {
          uid: index,
          status: 'done',
          url: value
        }
      })

      this.props.brandImageUpload(fileList, false, [])
    }
    this.props.getBrandsVisible(true, record)
  }

  handleRemove = () => {
    if (this.props.record) {
      const data = {
        eq_id: this.props.record.eq_id,
        brand_id: this.props.record.brand_id,
        image_url: this.props.record.image_url[0],
        thumb_url: this.props.record.thumb_url[0]
      }
      this.props.removeImage(data)
    }
    this.props.brandImageUpload(null, false, '')
  }

  getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  handleUpload = info => {
    if (info.file.status === 'uploading') {
      this.props.brandImageUpload(info.fileList, true, [])
      return
    }

    this.getBase64(info.file.originFileObj, imageUrl => {
      const image_urls = []
      image_urls.push(imageUrl.split(',')[1])
      info.fileList[0].status = 'done'
      this.props.brandImageUpload(info.fileList, false, image_urls)
    })
  }

  handleModalCancel = form => {
    form.resetFields()
    this.props.getBrandsVisible(false, null)
    this.props.brandImageUpload(null, false, '')
  }

  confirmForDeleteBrand = async record => {
    const data = {
      brand_id: record.brand_id
    }
    try {
      await service.brandDelete(data)
      message.success('Brand Deleted Successfully', 3)
      document.getElementById('input-search').value = ''
      this.fetch()
    } catch (error) {
      message.error('Error!', 3)
    }
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        this.props.isLoading(true)
        const data = {
          date_created: moment().format('LT'),
          ...values,
          image_urls: this.props.image_urls
        }
        try {
          if (this.props.removeImageData) {
            await service.removeBrandImage(this.props.removeImageData)
          }
          if (this.props.record) {
            data.brand_id = this.props.record.brand_id
            await service.brandEdit(data)
            message.success('Brand Edited Successfully', 3)
          } else {
            await service.brandAdd(data)
            message.success('Brand Added  Successfully', 3)
          }
          this.props.isLoading(false)
          this.handleModalCancel(form)
          this.props.removeImage(null)
          this.fetch()
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }
}
export default BrandsPM
