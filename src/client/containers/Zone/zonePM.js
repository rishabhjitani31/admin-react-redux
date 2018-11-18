import { message } from 'antd'
import service from 'api/zoneService'
import moment from 'moment'

class ZonePM {
  constructor(props) {
    this.props = props
  }

  fetch() {
    this.props.getZoneList()
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  showEditPopup = record => {
    this.props.getZoneVisible(true, record)
  }

  handleModalCancel = form => {
    form.resetFields()
    this.props.getZoneVisible(false, null)
  }

  confirmForDeleteZone = async record => {
    const data = {
      zone_id: record.zone_id
    }
    try {
      await service.zoneDelete(data)
      message.success('Zone Deleted Successfully', 3)
      this.fetch()
    } catch (error) {
      message.error('Error!', 3)
    }
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const data = {
          date_created: moment().format('LT'),
          zone_name: values.zone_name
        }
        try {
          if (this.props.record) {
            data.zone_id = this.props.record.zone_id
            await service.zoneEdit(data)
            message.success('Zone Edited Successfully', 3)
          } else {
            await service.zoneAdd(data)
            message.success('Zone Added Successfully', 3)
          }
          this.handleModalCancel(form)
          this.fetch()
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }
}
export default ZonePM
