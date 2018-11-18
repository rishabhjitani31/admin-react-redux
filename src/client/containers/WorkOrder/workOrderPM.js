import { getLocalStorageData } from 'utils/localStorage'
import service from 'api/workOrderService'
import { message } from 'antd'
import moment from 'moment'
class WorkOrderPM {
  constructor(props) {
    this.props = props
  }
  async fetch() {
    await this.props.getWorkOrderListWithPagination({
      page: this.props.tableSettings.current - 1,
      rows: this.props.tableSettings.pageSize,
      sort: '',
      sortBy: 'DESC'
    })
    //open ticket from dashboard table
    if (this.props.location.state && this.props.location.state.ticket_id) {
      this.getTicketDetail(this.props.location.state.ticket_id)
      this.props.history.push({
        //reset history state
        pathname: '/workOrder',
        state: { ticket_id: '' }
      })
    }
  }
  getTicketDetail = async ticket_id => {
    this.props.toggleDrawer(true)
    try {
      await this.props.fetchWorkOrderDetail({ ticket_id })
      this.getImages(this.props)
      const response = await service.readTicketComments({ ticket_id })
      if (response.success === 1) {
        this.props.removeTicketCount(ticket_id)
        this.props.getWorkOrderCount(response.workOrderCount)
      }
    } catch (error) {
      message.error('Error!', 3)
    }
  }
  onTrackFilter = (pagination, filters, sorter, search) => {
    console.log(filters.status)
    let params = {
      page: pagination.current - 1,
      rows: pagination.pageSize,
      sort: '',
      sortBy: 'DESC'
    }
    if (search) {
      params.search = search
      this.props.getWorkOrderListWithPagination(params)
    } else if (filters.status && filters.status.length > 0) {
      params.status = filters.status
      this.props.getWorkOrderListWithPagination(params)
    } else if (sorter.columnKey) {
      params.sort = sorter.columnKey
      params.sortBy = sorter.order !== 'descend' ? 'ASC' : 'DESC'
      this.props.getWorkOrderListWithPagination(params)
    } else {
      this.props.getWorkOrderListWithPagination(params)
    }
  }
  onSearchWorkOrder = e => {
    let pagination = { current: 1, pageSize: 20 }
    if (e.target.value.length !== 0) {
      this.onTrackFilter(pagination, '', '', e.target.value)
    } else {
      this.onTrackFilter(pagination, '', '')
    }
  }
  shouldComponentUpdate(props) {
    //update images array-socket
    if (
      (this.props.orderDetail.image_urls &&
        this.props.orderDetail.image_urls.length) !==
      (props.orderDetail.image_urls && props.orderDetail.image_urls.length)
    ) {
      this.getImages(props)
    }
    this.props = props
    return true
  }
  showPopup = () => {
    this.props.getWorkOrderVisible(true)
    this.props.getCustomerList()
    this.props.getIssuesList()
    if (getLocalStorageData(['last_customer']).last_customer !== 0) {
      this.props.getOutletList(
        getLocalStorageData(['last_customer']).last_customer
      )
    }
  }

  customerSelected(value, form) {
    this.props.getOutletList(value)
    this.props.getIssuesList()
    form.setFieldsValue({
      apt_id: undefined,
      eq_id: undefined,
      brand_id: undefined,
      model_id: undefined,
      sr_no: undefined,
      assignee_id: undefined
    })
    this.props.resetBrandsData()
    this.props.resetSrnosData()
    this.props.resetModelsData()
    this.props.resetStaffData()
    this.props.resetEquipmentsData()
  }

  outletSelected(value, form) {
    this.props.getEquipmentsByOutlet(value)
    this.props.resetBrandsData()
    this.props.resetSrnosData()
    this.props.resetModelsData()
    this.props.getIssuesList()
    this.props.getStaffList(value)
    form.setFieldsValue({
      eq_id: undefined,
      brand_id: undefined,
      model_id: undefined,
      sr_no: undefined,
      assignee_id: undefined
    })
  }

  equipmentSelected(value, form) {
    let data = {
      apt_id: form.getFieldValue('apt_id'),
      eq_id: value
    }
    this.props.getBrandsByOutlet(data)
    this.props.resetSrnosData()
    this.props.resetModelsData()
    this.props.getIssuesList(value)
    form.setFieldsValue({
      brand_id: undefined,
      model_id: undefined,
      custom_eq_name: '',
      sr_no: undefined,
      title: undefined
    })
  }
  onEquipmentInputChange = (e, form) => {
    this.props.getIssuesList()
    form.setFieldsValue({
      eq_id: undefined
    })
  }

  onBrandInputChange = (e, form) => {
    form.setFieldsValue({
      brand_id: undefined
    })
  }

  onModelInputChange = (e, form) => {
    form.setFieldsValue({
      model_id: undefined
    })
  }

  onSrNoInputChange = (e, form) => {
    form.setFieldsValue({
      sr_no: undefined
    })
  }

  onissueInputChange = (e, form) => {
    form.setFieldsValue({
      title: undefined
    })
  }

  serialNoSelected(form) {
    form.setFieldsValue({ custom_sr_no: '' })
  }

  issueSelected(value, option, form) {
    form.getFieldDecorator('mainTitle')
    form.setFieldsValue({ custom_title: '', mainTitle: option.props.children })
  }

  brandSelected(value, form) {
    let data = {
      apt_id: form.getFieldValue('apt_id'),
      eq_id: form.getFieldValue('eq_id'),
      brand_id: value
    }
    this.props.getModelsByOutlet(data)
    this.props.resetSrnosData()
    form.setFieldsValue({
      model_id: undefined,
      custom_brand_name: '',
      sr_no: undefined
    })
  }

  modelSelected(value, form) {
    let data = {
      apt_id: form.getFieldValue('apt_id'),
      eq_id: form.getFieldValue('eq_id'),
      brand_id: form.getFieldValue('brand_id'),
      model_id: value
    }
    this.props.getSrnosByOutlet(data)
    form.setFieldsValue({ sr_no: undefined, custom_model_name: '' })
  }

  handleModalCancel = form => {
    this.props.getWorkOrderVisible(false)
    this.props.workOrderImageUpload([], false, [])
    form.resetFields()
  }

  onRowClick = ({ ticket_id }) => {
    return {
      onClick: () => {
        this.getTicketDetail(ticket_id)
      }
    }
  }
  getImages = props => {
    if (
      props.orderDetail &&
      props.orderDetail.image_urls &&
      props.orderDetail.image_urls.length
    ) {
      const fileList = []
      props.orderDetail.thumb_urls.forEach((value, index) => {
        const item = {
          uid: index,
          status: 'done',
          url: value
        }
        fileList.push(item)
      })
      props.workOrderImageUpload(fileList, false, [])
    } else {
      props.workOrderImageUpload([], false, [])
    }
  }
  onDrawerClose = () => {
    this.props.toggleDrawer(false)
    this.props.workOrderImageUpload([], false, [])
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        this.props.isLoading(true)
        values.lease_id = values.apt_id
        values.area_id = ''
        values.lang = 'en'
        values.title = values.mainTitle
          ? [values.mainTitle]
          : [values.custom_title]
        const data = {
          ...values,
          image_urls: this.props.image_urls
        }

        delete values.mainTitle
        delete values.custom_title

        try {
          const response = await service.workOrderAdd(data)
          if (response.success === 1) {
            message.success('Ticket created successfully', 3)
            this.props.isLoading(false)
            this.handleModalCancel(form)
          } else {
            message.error('Error while creating ticket!', 3)
          }
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }
  handleRemove = async file => {
    this.props.disableUpload(true)
    let { ticket_id, image_urls } = this.props.orderDetail
    const data = {
      ticket_id,
      image_url:
        image_urls[this.props.orderDetail.thumb_urls.indexOf(file.url)],
      thumb_url: file.url
    }
    try {
      const response = await service.removeWorkOrderImage(data)
      this.props.disableUpload(false)
      if (response.success === 1) {
        message.success('Image removed successfully!', 3)
      } else {
        message.error('Error while removing image', 3)
      }
    } catch (error) {
      message.error('Error!', 3)
    }
  }

  getBase64(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    if (img) reader.readAsDataURL(img)
  }

  handleUpload = info => {
    if (info.file.status === 'uploading') {
      this.props.workOrderImageUpload(info.fileList, true, [])
      return
    }
    this.getBase64(info.file.originFileObj, imageUrl => {
      const image_urls = []
      image_urls.push(imageUrl.split(',')[1])
      this.props.workOrderImageUpload(info.fileList, false, image_urls)

      if (this.props.visible) this.uploadImage() //upload image from drawer
    })
  }

  handleUpdateTitle = () => {
    this.props.getIssuesList(this.props.orderDetail.eq_id)
    this.props.updateChangeTitleFlag(true)
  }

  updateTitle = async ({ ticket_id }) => {
    let sendToServer = { ticket_id }
    if (this.props.newTitleId) {
      let titleObj = this.props.issuesList.find(
        element => element.id == this.props.newTitleId
      )
      sendToServer.title = titleObj.title
    } else if (this.props.newTitle) {
      sendToServer.title = this.props.newTitle
    } else {
      message.error('Please select/enter Issue Title!', 3)
      return
    }
    try {
      const response = await service.changeTitleOutletCustData(sendToServer)
      if (response.success === 1) {
        await this.props.fetchWorkOrderDetail({ ticket_id })
        this.props.updateTitleFieldsValue(true)
        this.props.updateChangeTitleFlag(false)
        message.success('Edited successfully!')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }
  handleUpdateCustomer = () => {
    this.props.getCustomerList()
    this.props.updateChangeCustomerFlag(true)
  }
  updateCustomer = async ({ ticket_id }) => {
    let sendToServer = { ticket_id }
    if (this.props.newCustomerId) {
      sendToServer.customer_id = this.props.newCustomerId
    } else {
      message.error('Please select Customer!', 3)
      return
    }
    try {
      const response = await service.changeTitleOutletCustData(sendToServer)
      if (response.success === 1) {
        await this.props.fetchWorkOrderDetail({ ticket_id })
        this.props.getOutletList(this.props.orderDetail.customer_id)
        this.props.updateCustomerFieldsValue(true)
        this.props.updateChangeCustomerFlag(false)
        message.success('Edited successfully!')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }
  handleUpdateOutlet = () => {
    this.props.getOutletList(this.props.orderDetail.customer_id)
    this.props.updateChangeOutletFlag(true)
  }
  updateOutlet = async ({ ticket_id }) => {
    let sendToServer = { ticket_id }
    if (this.props.newOutletId) {
      sendToServer.apt_id = this.props.newOutletId
    } else {
      message.error('Please select Outlet!', 3)
      return
    }
    try {
      const response = await service.changeTitleOutletCustData(sendToServer)
      if (response.success === 1) {
        await this.props.fetchWorkOrderDetail({ ticket_id })
        this.props.getEquipmentsByOutlet(this.props.orderDetail.apt_id)
        this.props.updateOutletFieldsValue(true)
        this.props.updateChangeOutletFlag(false)
        message.success('Edited successfully!')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }

  handleButtonClick = async (e, { ticket_id }) => {
    e.preventDefault()
    try {
      await this.props.sendTicketComment({
        ticket_id,
        comment: this.props.commentValue
      })
      this.props.fetchWorkOrderDetail({ ticket_id })
      this.props.handleChangeComment('')
    } catch (error) {
      message.error('Error', 3)
    }
  }
  handleKeyPress = (e, orderDetail) => {
    if (e.key === 'Enter') {
      this.handleButtonClick(e, orderDetail)
    }
  }

  handleUpdateEquipment = () => {
    this.props.getEquipmentsByOutlet(this.props.orderDetail.apt_id)
    this.props.updateChangeEquipmentFlag(true)
  }
  updateEquipment = async ({ ticket_id }) => {
    let sendToServer = { ticket_id }
    if (this.props.newEquipmentId) {
      sendToServer.eq_id = this.props.newEquipmentId
    } else if (this.props.newEquipment) {
      sendToServer.custom_eq_name = this.props.newEquipment
    } else {
      message.error('Please select/enter Equipment!', 3)
      return
    }
    try {
      const response = await service.changeEquipmentsData(sendToServer)
      if (response.success === 1) {
        await this.props.fetchWorkOrderDetail({ ticket_id })
        this.props.getBrandsByOutlet({
          apt_id: this.props.orderDetail.apt_id,
          eq_id: this.props.orderDetail.eq_id
        })
        this.props.updateEquipmentFieldsValue(true)
        this.props.updateChangeEquipmentFlag(false)
        message.success('Edited successfully!')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }

  handleUpdateBrand = () => {
    this.props.getBrandsByOutlet({
      apt_id: this.props.orderDetail.apt_id,
      eq_id: this.props.orderDetail.eq_id
    })
    this.props.updateChangeBrandFlag(true)
  }
  updateBrand = async ({ ticket_id }) => {
    let sendToServer = { ticket_id }
    if (this.props.newBrandId) {
      sendToServer.brand_id = this.props.newBrandId
    } else if (this.props.newBrand) {
      sendToServer.custom_brand_name = this.props.newBrand
    } else {
      message.error('Please select/enter Brand!', 3)
      return
    }
    try {
      const response = await service.changeEquipmentsData(sendToServer)
      if (response.success === 1) {
        await this.props.fetchWorkOrderDetail({ ticket_id })
        this.props.getModelsByOutlet({
          apt_id: this.props.orderDetail.apt_id,
          eq_id: this.props.orderDetail.eq_id,
          brand_id: this.props.orderDetail.brand_id
        })
        this.props.updateBrandFieldsValue(true)
        this.props.updateChangeBrandFlag(false)
        message.success('Edited successfully!')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }

  handleUpdateModel = () => {
    this.props.getModelsByOutlet({
      apt_id: this.props.orderDetail.apt_id,
      eq_id: this.props.orderDetail.eq_id,
      brand_id: this.props.orderDetail.brand_id
    })
    this.props.updateChangeModelFlag(true)
  }
  updateModel = async ({ ticket_id }) => {
    let sendToServer = { ticket_id }
    if (this.props.newModelId) {
      sendToServer.model_id = this.props.newModelId
    } else if (this.props.newModel) {
      sendToServer.custom_model_name = this.props.newModel
    } else {
      message.error('Please select/enter Model!', 3)
      return
    }
    try {
      const response = await service.changeEquipmentsData(sendToServer)
      if (response.success === 1) {
        await this.props.fetchWorkOrderDetail({ ticket_id })
        this.props.getSrnosByOutlet({
          apt_id: this.props.orderDetail.apt_id,
          eq_id: this.props.orderDetail.eq_id,
          brand_id: this.props.orderDetail.brand_id,
          model_id: this.props.orderDetail.model_id
        })
        this.props.updateModelFieldsValue(true)
        this.props.updateChangeModelFlag(false)
        message.success('Edited successfully!')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }

  handleUpdateSrno = () => {
    this.props.getSrnosByOutlet({
      apt_id: this.props.orderDetail.apt_id,
      eq_id: this.props.orderDetail.eq_id,
      brand_id: this.props.orderDetail.brand_id,
      model_id: this.props.orderDetail.model_id
    })
    this.props.updateChangeSrnoFlag(true)
  }
  updateSrno = async ({ ticket_id }) => {
    let sendToServer = { ticket_id }
    if (this.props.newSrnoId) {
      sendToServer.sr_no = this.props.newSrnoId
    } else if (this.props.newSrno) {
      sendToServer.custom_sr_no = this.props.newSrno
    } else {
      message.error('Please select/enter Serial no!', 3)
      return
    }
    try {
      const response = await service.changeEquipmentsData(sendToServer)
      if (response.success === 1) {
        await this.props.fetchWorkOrderDetail({ ticket_id })
        this.props.updateSrnoFieldsValue(true)
        this.props.updateChangeSrnoFlag(false)
        message.success('Edited successfully!')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }

  handleUpdateAssignee = () => {
    this.props.getStaffList(this.props.orderDetail.apt_id)
    this.props.updateChangeAssigneeFlag(true)
  }
  updateAssignee = async ({ ticket_id }) => {
    let sendToServer = { ticket_id }
    if (this.props.newAssigneeId) {
      sendToServer.assignee_id = this.props.newAssigneeId
    } else {
      message.error('Please select/enter Assignee!', 3)
      return
    }
    try {
      const response = await service.changeAssigneeData(sendToServer)
      if (response.success === 1) {
        await this.props.fetchWorkOrderDetail({ ticket_id })
        this.props.updateAssigneeFieldsValue(true)
        this.props.updateChangeAssigneeFlag(false)
        message.success('Edited successfully!')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }
  handleTicketActions = async (e, { ticket_id, apt_id }, val) => {
    e.preventDefault()
    let sendToServer = {
      ticket_id,
      apt_id,
      comment: ''
    }
    try {
      if (val === 1) {
        const response = await service.startTicketWork(sendToServer)
        if (response.success === 1) {
          await this.props.fetchWorkOrderDetail({ ticket_id })
          message.success('Ticket Work Started!')
        } else {
          message.error(response.message)
        }
      } else if (val === 3) {
        const response = await service.stopTicketWork(sendToServer)
        if (response.success === 1) {
          await this.props.fetchWorkOrderDetail({ ticket_id })
          message.success('TicketWork Stopped!')
        } else {
          message.error(response.message)
        }
      } else if (val === 4) {
        const response = await service.verifyTicketWork(sendToServer)
        if (response.success === 1) {
          await this.props.fetchWorkOrderDetail({ ticket_id })
          message.success('Ticket Work Verified!')
        } else {
          message.error(response.message)
        }
      } else {
        const response = await service.completeTicketWork(sendToServer)
        if (response.success === 1) {
          await this.props.fetchWorkOrderDetail({ ticket_id })
          message.success('Ticket Work Completed! Please fill report.')
          this.props.showReportForm(true, this.props.orderDetail)
        } else {
          message.error(response.message)
        }
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }
  editReportForm = async ticket_id => {
    try {
      const response = await service.getReportData({ ticket_id })
      if (response.success === 1) {
        this.props.showReportForm(true, response.data)
      } else {
        message.error('Error while fetching report data. Please try again!', 5)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }
  handleReportModalCancel = (e, form) => {
    this.props.showReportForm(false, {})
    form.resetFields()
  }
  deletePartsData = data => {
    let partsReplaced = [...this.props.partsReplaced]
    let index = partsReplaced.indexOf(data)
    if (index > -1) {
      partsReplaced.splice(index, 1)
    }
    this.props.handlePartsReplaced(partsReplaced)
  }
  AddPartsData = () => {
    let partsReplaced = [...this.props.partsReplaced]
    if (this.props.partNo && this.props.quantity) {
      partsReplaced.push({
        description: this.props.description,
        part_no: this.props.partNo,
        quantity: this.props.quantity
      })
      this.props.handlePartsReplaced(partsReplaced)
      this.props.handleDescriptionChange()
      this.props.handlePartNoChange()
      this.props.handleQtyChange()
      this.props.showPartsDataInpuFields(false)
    } else {
      message.error('please fill Part No and Quantity')
    }
  }

  handlePartsDataCancel = () => {
    this.props.handleDescriptionChange()
    this.props.handlePartNoChange()
    this.props.handleQtyChange()
    this.props.showPartsDataInpuFields(false)
  }

  handleReportSubmit = (form, partsData, { ticket_id }) => e => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (err) {
        return
      }
      let params = {
        apt_id: this.props.reportDetail.apt_id,
        city_name: this.props.reportDetail.city_name,
        ticket_id: this.props.reportDetail.ticket_id,
        issue_id: this.props.reportDetail.issue_id,
        partsData: partsData || [],
        ...values
      }
      params.time_arrive = moment(this.props.reportDetail.ticket_start)
      params.time_left = moment(this.props.reportDetail.ticket_complete)

      if (params.model_name === '--') {
        params.model_name = null
      }
      if (params.eq_name === '--') {
        params.eq_name = null
      }
      if (params.brand_name === '--') {
        params.brand_name = null
      }
      if (params.sr_no === '--') {
        params.sr_no = null
      }

      if (!this.props.reportDetail.receipt_id) {
        params.customer_phone =
          (this.props.reportDetail.country_code || '+91') +
          params.customer_phone
        params.assignee_phone =
          (this.props.reportDetail.assignee_country_code || '+91') +
          params.assignee_phone

        try {
          const response = await service.createTicketReceipt(params)
          if (response.success === 1) {
            await this.props.fetchWorkOrderDetail({ ticket_id })
            this.props.showReportForm(false, {})
            form.resetFields()
            message.success('Report Submitted!')
          } else {
            message.error(response.message)
          }
        } catch (error) {
          message.error('Error', 3)
        }
      } else {
        params.customer_phone =
          (this.props.reportDetail.customer_phone.indexOf('+') >= 0
            ? this.props.reportDetail.customer_phone.slice(0, 3)
            : '') + params.customer_phone
        params.assignee_phone =
          (this.props.reportDetail.assignee_phone.indexOf('+') >= 0
            ? this.props.reportDetail.assignee_phone.slice(0, 3)
            : '') + params.assignee_phone

        try {
          const response = await service.updateTicketReceipt(params)
          if (response.success === 1) {
            await this.props.fetchWorkOrderDetail({ ticket_id })
            this.props.showReportForm(false, {})
            form.resetFields()
            message.success('Report Submitted!')
          } else {
            message.error(response.message)
          }
        } catch (error) {
          message.error('Error', 3)
        }
      }
    })
  }

  uploadImage = async () => {
    this.props.disableUpload(true)
    let { ticket_id, apt_id } = this.props.orderDetail
    try {
      let response = await service.uploadWorkOrderImage({
        ticket_id,
        apt_id,
        image_urls: this.props.image_urls
      })
      this.props.workOrderImageUpload([], false, [], true) //reset old arrray for work order detail
      this.props.disableUpload(false)
      if (response.success === 1) {
        message.success('Image uploaded successfully!')
      } else {
        message.error(response.message)
      }
    } catch (error) {
      message.error('Error', 3)
    }
  }
  handleImageRemove = data => {
    let fileList = this.props.fileList
    let imageUrls = this.props.image_urls

    let index = fileList.indexOf(data)
    if (index > -1) {
      fileList.splice(index, 1)
    }

    let index1 = imageUrls.indexOf(data.thumbUrl && data.thumbUrl.split(',')[1])
    if (index1 > -1) {
      imageUrls.splice(index1, 1)
    }

    this.props.workOrderImageUpload(fileList, false, imageUrls, true)
  }

  markAllTicketRead = async () => {
    try {
      const response = await service.readAllTickets()
      if (response.success === 1) {
        this.props.getWorkOrderCount()
        this.fetch()
      } else {
        message.error('Please try again!')
      }
    } catch (error) {
      message.error('Error!')
    }
  }
}
export default WorkOrderPM
