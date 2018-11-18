import service from 'api/storeLocationsService'
import { message } from 'antd'
class OutletInformationPm {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getCityList()
    this.props.getZoneList()
    this.props.getCustomerList()
  }
  dispose() {
    localStorage.removeItem('aptDetail')
  }
  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  handleZoneChange = (zone_id, form) => {
    form.resetFields('city_id')
    const filterCityList = this.props.cityList.filter(
      city => city.zone_id === zone_id
    )
    this.props.onZoneChange(filterCityList)
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        let data = {
          number: values.apt_name,
          active:
            values.active === undefined || values.active === false
              ? false
              : true,
          zone_id: values.zone_id,
          city_id: values.city_id,
          store_id: values.store_id,
          cost_center: values.cost_center,
          opening_date: values.opening_date,
          customer_id: values.customer_id,
          email: values.email,
          phone: values.phone
        }
        const aptDetail = JSON.parse(localStorage.getItem('aptDetail'))
        try {
          if (aptDetail) {
            data.id = aptDetail.apt_id
            await service.addLocation(data)
            message.success('Outlet  Edited Successfully', 3)
          } else {
            await service.addLocation(data)
            message.success('Outlet Added  Successfully', 3)
          }
          this.props.history.goBack()
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }
}
export default OutletInformationPm
