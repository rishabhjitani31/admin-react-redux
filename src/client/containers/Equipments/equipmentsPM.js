import service from 'api/equipmentsService'
import { getLocalStorageData } from 'utils/localStorage'
import { message } from 'antd'

class EquipmentsPM {
  constructor(props) {
    this.props = props
    this.fileList = []
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  fetch() {
    this.props.getEquipmentsList()
  }

  handleUploadChange = info => {
    this.getBase64(info.file.originFileObj, imageUrl => {
      const fileList = {
        uid: Math.random(),
        name: info.file.name,
        status: 'done',
        url: imageUrl
      }
      this.props.setSelectedImageToUpload(imageUrl, fileList)
    })
  }

  handleRemove = async rem => {
    const { selectedEquipment } = this.props
    if (Object.keys(selectedEquipment).length) {
      await service.removeEquipmentImage(rem, selectedEquipment)
    }
    this.props.handleRemoveFile()
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  addNewEquipment = props => {
    const staff_id = getLocalStorageData(['staff_id']).staff_id
    props.form.validateFields(async (err, values) => {
      if (!err) {
        if (!Object.keys(this.props.selectedEquipment).length) {
          const payload = {
            date_created: new Date(),
            eq_name: values.equipmentName,
            image_urls: props.selectedImageToUpload.length
              ? [props.selectedImageToUpload.split(',')[1]]
              : '',
            staff_id
          }

          try {
            await service.addNewEquipment(payload)
            props.form.resetFields()
            props.toggleEquipmentToggleModal()
            message.success('equipment Added successfully')
            this.fetch()
          } catch (error) {
            message.error('Error! ', error)
          }
        } else {
          const payload = {
            date_created: new Date(),
            eq_id: this.props.selectedEquipment.eq_id,
            eq_name: values.equipmentName,
            image_urls: props.selectedImageToUpload
              ? [props.selectedImageToUpload.split(',')[1]]
              : [],
            staff_id
          }

          try {
            await service.editEquipment(payload)
            props.toggleEquipmentToggleModal()
            message.success('equipment Edited successfully')
            document.getElementById('input-search').value = ''
            this.fetch()
          } catch (error) {
            message.error('Error! ', error)
          }
        }
      }
    })
  }

  hideHandleEquipmentsModel = props => {
    props.form.resetFields()
    props.toggleEquipmentToggleModal()
  }

  toggleEquipmentsForEdit = data => {
    const fileList = {
      uid: Math.random(),
      name: data.eq_id,
      status: 'done',
      url: data.image_url[data.image_url.length - 1]
    }
    this.props.toggleEquipmentsForEdit(fileList, data)
  }

  deleteEquipment = async data => {
    try {
      await service.deleteEquipment(data)
      message.success('equipment Deleted successfully.')
      document.getElementById('input-search').value = ''
      this.fetch()
    } catch (e) {
      message.error('Error.! ', e)
    }
  }

  toggleAddIssuesModal = (rowData = '') => {
    this.props.getDefaultIssuesList()
    this.props.toggleAddIssuesModal(rowData)
  }

  onRowsSelect = selectedRowKeys => {
    this.props.setAddIssuesSelectedRows(selectedRowKeys)
  }

  updateIssuesFormSubmit = async props => {
    const payload = {
      eq_id: props.selectedAddIssueData.eq_id,
      issue_ids: props.selectedRowKeys
    }

    try {
      await service.updateIssueList(payload)
      message.success('Issue List has been updated.')
      props.pm.toggleAddIssuesModal()
      document.getElementById('input-search').value = ''
      this.fetch()
    } catch (e) {
      message.error('Error in Updating the List')
    }
  }

  handleIssueTitleChange = e => {
    e.preventDefault()
    this.props.handleIssueTitleChange(e.target.value)
  }

  addNewIssue = async () => {
    await service.addNewIssue(this.props.addUpdateIssueTitle)
    message.success('Issue has been addedd successfully.')
    this.toggleaddUpdateForm({})
    this.props.getDefaultIssuesList()
  }

  toggleaddUpdateForm = addFormObj => {
    this.props.toggleaddUpdateForm(addFormObj)
  }

  deleteIssue = async id => {
    const response = await service.deleteIssue(id)
    if (response.success) {
      message.success('Issue has been deleted successfully.')
    } else message.error('Error deleting Issue.')
    this.props.getDefaultIssuesList()
  }

  editCurrentIssue = (row, index) => {
    this.props.editCurrentIssue(row, index)
  }

  cancelIssueEditing = () => {
    this.props.cancelIssueEditing()
  }

  handleEditIssueChange = e => {
    this.props.handleEditInputChange(e.target.value)
  }

  updateSelectedIssue = async () => {
    let id = this.props.selectedIssueRowData.id
    let title = this.props.issueEditVal
    const response = await service.updateSelectedIssue(id, title)
    if (response.success) message.success('Issue Updated successfully.')
    else message.error('Error updating Issue.')
    this.cancelIssueEditing()
    this.props.getDefaultIssuesList()
  }
}

export default EquipmentsPM
