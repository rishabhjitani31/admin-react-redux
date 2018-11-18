import moment from 'moment'
import service from 'api/storeLocationsService'
import { getLocalStorageData } from 'utils/localStorage'
import { message } from 'antd'
class EquipmentsPm {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getEquipmentsList()
    const record = JSON.parse(localStorage.getItem('selectEquipment'))
    if (record) {
      this.props.getLocationEquipmentsLists(record.apt_id)
    }

    this.props.getBrandsList()
    this.props.getModelList()
  }
  handleEquipmentModal = record => {
    this.props.equipmentModalVisible(true, record)
    if (!record) this.addEquipmentForm()
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  handleModalCancel = () => {
    this.props.equipmentModalVisible(false, null)
    this.props.cancelEquipmentForm()
  }
  addEquipmentForm = () => {
    const { community_id } = getLocalStorageData(['community_id'])
    const selectedObj = {
      brandslist: [],
      modelList: [],
      serialNoList: [],
      warrantyForSrNoList: [],
      active: true,
      brand_id: '',
      eq_id: '',
      model_id: '',
      sr_no: '',
      sr_id: '',
      community_id,
      warranty_month: '',
      installation_date: moment(moment().locale('en')),
      radio_val: ''
    }
    this.props.addEquipmentForm(selectedObj)
  }
  filterBrandsList = eq_id => {
    const filterBrandsList = this.props.brandslist.filter(
      brand => brand.eq_id === eq_id
    )
    return filterBrandsList
  }
  filterModelList = (brand_id, eq_id) => {
    const filterModelList = this.props.modellist.filter(
      model => model.brand_id === brand_id && model.eq_id === eq_id
    )
    return filterModelList
  }

  getSerialNoList = (model_id, brand_id, eq_id) => {
    const data = {
      installation_date: moment().format('LT'),
      model_id,
      brand_id,
      eq_id
    }
    return service.getSerialNo(data)
  }
  getWarrantyList = (sr_id, sr_no, model_id, brand_id, eq_id) => {
    const data = {
      sr_id,
      sr_no,
      model_id,
      brand_id,
      eq_id
    }
    return service.getWarrantyForSrNo(data)
  }

  getDefaultWaeeantyList = () => {
    let warrantyForSrNoList = []
    for (var i = 0; i < 101; i++) {
      warrantyForSrNoList.push({ warranty_month: i })
    }
    return warrantyForSrNoList
  }
  editEquipmentModal = async record => {
    const serialNoList = await this.getSerialNoList(
      record.model_id,
      record.brand_id,
      record.eq_id
    )

    const warranty = await this.getWarrantyList(
      record.sr_no,
      record.model_id,
      record.brand_id,
      record.eq_id
    )
    let warrantyForSrNoList = []
    if (!warranty.data) {
      warrantyForSrNoList = this.getDefaultWaeeantyList()
    } else {
      warrantyForSrNoList = [warranty.data]
    }

    const selectedObj = {
      brandslist: this.filterBrandsList(record.eq_id),
      modelList: this.filterModelList(record.brand_id, record.eq_id),
      serialNoList: serialNoList.data,
      warrantyForSrNoList: warrantyForSrNoList,
      active: record.active,
      brand_id: record.brand_id,
      eq_id: record.eq_id,
      model_id: record.model_id,
      id: record.id,
      sr_id: record.sr_id,
      sr_no: record.sr_no,
      community_id: record.community_id,
      warranty_month: record.warranty_month,
      installation_date: moment(moment(record.installation_date).locale('en')),
      radio_val: 1
    }
    if (this.props.equipmentForm.length === 0) {
      this.props.addEquipmentForm(selectedObj)
      this.props.equipmentModalVisible(true, record)
    }
  }

  handleEquipmentChange = (id, index, form) => {
    form.resetFields()
    this.props.storeFilterBrandsList(this.filterBrandsList(id), index, id)
  }
  handleBrandChange = (id, index, form) => {
    form.resetFields(`model_id[${index}]`)
    form.resetFields(`sr_no[${index}]`)

    this.props.storeFilterModelList(
      this.filterModelList(id, this.props.equipmentForm[index].eq_id),
      index,
      id
    )
  }
  handleModelChange = async (id, index, form) => {
    form.resetFields(`sr_no[${index}]`)
    const serialNoList = await this.getSerialNoList(
      id,
      this.props.equipmentForm[index].brand_id,
      this.props.equipmentForm[index].eq_id
    )
    this.props.setModelChange(serialNoList.data, index, id)
  }

  onSerialNoselect = (e, index, form) => {
    form.resetFields(`sr_no[${index}]`)
    form.resetFields(`sr_id[${index}]`)
    if (e.target.value === 2) {
      this.props.onSerialNoselect(
        e.target.value,
        index,
        this.getDefaultWaeeantyList()
      )
    } else {
      this.props.onSerialNoselect(e.target.value, index, [])
    }
  }

  handleSerialNoChange = async (sr_no, index, sr_id, form) => {
    form.resetFields(`warranty_month[${index}]`)
    const warranty = await this.getWarrantyList(
      sr_id,
      sr_no,
      this.props.equipmentForm[index].model_id,
      this.props.equipmentForm[index].brand_id,
      this.props.equipmentForm[index].eq_id
    )
    let warrantyForSrNoList = []
    if (!warranty.data.warranty_month === null) {
      warrantyForSrNoList = this.getDefaultWaeeantyList()
    } else {
      warrantyForSrNoList = [warranty.data]
    }

    this.props.setSerialNoChange(warrantyForSrNoList, sr_no, sr_id, index)
  }
  handleSerialInput = (serialNo, index) => {
    this.props.setSerialNoChange(
      this.getDefaultWaeeantyList(),
      serialNo,
      null,
      index
    )
  }

  handleWarrantyChange = (warranty_month, index) => {
    this.props.setWarrantyChange(warranty_month, index)
  }

  handleInstallmentDataChange = (installation_date, index) => {
    this.props.setInstallmentDataChange(installation_date, index)
  }
  handleSubmit = (e, form) => {
    e.preventDefault()
    if (this.props.equipmentForm.length > 0) {
      form.validateFields(async (err, values) => {
        if (!err) {
          try {
            if (this.props.record) {
              // edit case
              const response = await service.updateLocationEquipment(
                this.props.equipmentForm[0]
              )
              if (response.success) {
                message.success('Serial No has been updated.', 3)
              } else message.error(response.message, 3)
            } else {
              const selectEquipment = JSON.parse(
                localStorage.getItem('selectEquipment')
              )
              const response = await service.addEquipment(
                this.props.equipmentForm,
                selectEquipment.customer_id,
                selectEquipment.apt_id
              )
              if (response.success) {
                message.success('Equipment has been successfully added.', 3)
              } else message.error(response.message, 3)
            }
            this.fetch()

            this.handleModalCancel()
          } catch (error) {
            message.error('Error!', 3)
          }
        }
      })
    } else {
      message.error('please fill all required field', 3)
    }
  }

  removeEquipmentData = key => {
    this.props.removeEquipmentData(key)
  }

  onActivateChange = async (active, id) => {
    const response = await service.activeDeactiveSrNo(active, id)
    if (response.success) {
      message.success(
        `Equipment has been ${active ? 'activated' : 'deactivated'}`,
        3
      )
    } else {
      message.error(response.message, 3)
    }
  }

  deleteEquipment = async rowData => {
    const response = await service.removeEquipment(rowData.id)
    if (response.success) {
      message.success('Deleted Successfully', 3)
      this.fetch()
    } else message.error(response.message, 3)
  }
}

export default EquipmentsPm
