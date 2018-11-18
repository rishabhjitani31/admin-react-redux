import service from 'api/uploadModalFilesService'
import { message } from 'antd'

class UploadModelFilesPM {
  constructor(props) {
    this.props = props
    this.modelId = ''
    this.uploadFilesArr = []
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  fetch() {
    const { location: { state: { model_id } } } = this.props
    this.modelId = model_id
    this.props.getModelDetails(this.modelId)
  }

  setEditingModal = (data, i) => {
    this.props.setEditingModalValues(data, i)
  }

  deleteModal = async data => {
    let userModelDetails = this.props.uploadModelDetails
    const response = await service.deleteModal(data, userModelDetails)
    if (response.success) message.success('Deleted successfully.')
    else if (response.error) message.error('Error deleting manual.')
    this.fetch()
  }

  handlleFilenameChange = e => {
    this.props.handlleFilenameChange(e.target.value)
  }

  updateManual = async data => {
    let userModelDetails = this.props.uploadModelDetails
    let manualUpdatedName = this.props.fileName
    const response = await service.updateManual(
      data,
      userModelDetails,
      manualUpdatedName
    )
    if (response.success) {
      message.success('Manual updated successfully.')
    } else {
      message.error('Error updating Manual.')
    }
    this.setEditingModal({}, -1)
    this.fetch()
  }

  activeDeactiveManual = async (isChecked, rowData) => {
    console.log(isChecked, rowData)
    let userModelDetails = this.props.uploadModelDetails
    const response = await service.activeDeactiveManual(
      isChecked,
      rowData,
      userModelDetails
    )
    if (response.success) {
      if (isChecked) message.success('Manual status has been activated')
      else message.success('Manual status has been deactivated')
    } else {
      message.error('Manual status activation failed.')
    }
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  uploadImageChange = info => {
    if (info.file.status === 'uploading') {
      this.props.addToUploadFilesArray(info.fileList, null)
      return
    }

    let fileObj = {
      name: info.file.name,
      type: info.file.type,
      uid: info.file.uid,
      status: 'done'
    }
    this.getBase64(info.file.originFileObj, imageUrl => {
      fileObj.url = imageUrl.split(',')[1]
      info.fileList[info.fileList.length - 1].status = 'done'
      this.props.addToUploadFilesArray(info.fileList, fileObj)
    })
  }
  imageRemove = info => {
    this.props.imageRemove(info.uid)
  }
  onUploadImageSubmit = async () => {
    this.props.handleIsLoading(true)

    let manual_urls = this.props.uploadModelDetails.manual_url
      ? JSON.parse(this.props.uploadModelDetails.manual_url)
      : []

    const response = await service.uploadModelImages(
      this.props.uploadFilesArray,
      manual_urls,
      this.props.uploadModelDetails
    )
    if (response.success) {
      this.props.clearUploadFilesArray()
      this.props.handleIsLoading(false)
      this.fetch()
      message.success('Images successfully uploaded.', 3)
    } else {
      this.props.handleIsLoading(false)
      message.error('Error uploading images.')
    }
  }

  goBack = () => {
    this.props.history.push('/models')
  }
}

export default UploadModelFilesPM
