import { message } from 'antd'
import service from 'api/serialNoService'

class SerialNoPM {
  WarrantyMonths = []
  constructor(props) {
    this.props = props
  }

  fetch() {
    this.props.getSerialNoDataList({
      page: 0,
      rows: 20,
      sort: 'sr_no',
      sortBy: 'ASC'
    })
    this.props.getEquipmentsList()
    this.props.getBrandsList()
    this.props.getModelList()
  }

  handleEquipmentInformation = rowData => {
    localStorage.setItem('selectEquipmentHistory', JSON.stringify(rowData))
    this.props.history.push({
      pathname: '/equipmentHistory'
    })
  }

  onTrackFilter = (pagination, filters, sorter, search) => {
    let params = {
      page: pagination.current - 1,
      rows: pagination.pageSize,
      sort: 'sr_no',
      sortBy: 'ASC'
    }
    if (search) {
      params.search = search
      this.props.getSerialNoDataList(params)
    } else if (sorter.columnKey) {
      params.sort = sorter.columnKey
      params.sortBy = sorter.order !== 'descend' ? 'ASC' : 'DESC'
      this.props.getSerialNoDataList(params)
    } else {
      this.props.getSerialNoDataList(params)
    }
  }

  onSearchSerialNo = e => {
    let pagination = { current: 1, pageSize: 20 }
    if (e.target.value.length !== 0) {
      this.onTrackFilter(pagination, '', '', e.target.value)
    } else {
      this.onTrackFilter(pagination, '', '')
    }
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  showEditPopup = record => {
    this.props.getSerialNoVisible(true, record)
    if (!record) {
      this.props.onAddSerialNo(this.props.totalSerialNos, {
        serialNo: null,
        month: null
      })
    }
  }

  handleModalCancel = () => {
    this.props.onClear()
    this.props.form.resetFields()
    this.props.getSerialNoVisible(false, null)
  }

  confirmForDeleteCity = async record => {
    const data = {
      id: record.id
    }
    try {
      await service.serialNoDelete(data)
      message.success('Deleted Successfully', 3)
      this.fetch()
    } catch (error) {
      message.error('Error!', 3)
    }
  }

  onEquipmentSelected = value => {
    this.props.onEquipmentChange(value)
    this.props.form.setFieldsValue({
      brand_id: undefined,
      model_id: undefined
    })
  }

  onBrandSelected = value => {
    this.props.onBrandChange(value)
    this.props.form.setFieldsValue({
      model_id: undefined
    })
  }

  onModelSelected = value => {
    this.props.onModelChange(value)
  }

  remove = key => {
    this.props.onRemoveSerialNo(key)
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          if (this.props.record) {
            values.id = this.props.record.id
            let res = await service.serialNoUpdate(values)
            if (res.success === 0) {
              message.error(res.message, 3)
            } else {
              message.success('Serial No Updated Successfully', 3)
              this.handleModalCancel()
              this.fetch()
              let value = document.getElementById('input-search').value
              let pagination = { current: 1, pageSize: 20 }
              this.onTrackFilter(pagination, '', '', value)
            }
          } else {
            if (values.sr_no && values.warranty_month) {
              values.sr_no.splice(0, 1)
              values.warranty_month.splice(0, 1)
              values.sr_no = values.sr_no.map((value, index) => {
                return (
                  value !== null && {
                    sr_no: values.sr_no[index],
                    warranty_month: values.warranty_month[index]
                  }
                )
              })
              values.sr_no = values.sr_no.filter(e => e !== null)
              delete values.warranty_month
            }
            let resp = await service.serialNoInsert(values)
            if (resp.success === 0) {
              message.error(resp.message, 3)
            } else {
              message.success('Serial No added Successfully', 3)
              this.handleModalCancel()
              this.fetch()
            }
          }
        } catch (error) {
          message.error(error.message)
        }
      }
    })
  }

  getPageDataOnChangeSerialNo = (page, pagesize) => {
    console.log('page', page, 'pagesize', pagesize)
  }
}
export default SerialNoPM
