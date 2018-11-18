import { message } from 'antd'
import service from 'api/cityService'
import moment from 'moment'

class CityPM {
  constructor(props) {
    this.props = props
  }

  fetch() {
    this.props.getCityList()
    this.props.getZoneList()
  }

  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  showEditPopup = record => {
    this.props.getCityVisible(true, record)
  }

  handleModalCancel = form => {
    form.resetFields()
    this.props.getCityVisible(false, null)
  }

  confirmForDeleteCity = async record => {
    const data = {
      city_id: record.city_id
    }
    try {
      await service.cityDelete(data)
      message.success(' City Deleted Successfully', 3)
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
        const data = {
          date_created: moment().format('LT'),
          city_name: values.city_name,
          zone_id: values.zone_id
        }
        try {
          if (this.props.record) {
            data.city_id = this.props.record.city_id
            await service.cityEdit(data)
            message.success(' City Edited Successfully', 3)
          } else {
            await service.cityAdd(data)
            message.success(' City Added Successfully', 3)
          }
          form.resetFields()
          this.handleModalCancel(form)
          document.getElementById('input-search').value = ''
          this.fetch()
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }
}
export default CityPM
