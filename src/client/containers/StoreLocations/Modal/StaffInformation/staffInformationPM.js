// import service from 'api/storeLocationsService'
// import { message } from 'antd'
class StaffInformationPM {
  constructor(props) {
    this.props = props
  }

  fetch() {
    const selectSatffInformation = JSON.parse(
      localStorage.getItem('selectSatffInformation')
    )
    if (selectSatffInformation) {
      this.props.getSatffInformation(selectSatffInformation.apt_id)
    }
  }
  dispose() {
    localStorage.removeItem('selectSatffInformation')
  }
}
export default StaffInformationPM
