import { getLocalStorageData } from 'utils/localStorage'
class EquipmentHistoryPM {
  constructor(props) {
    this.props = props
  }

  fetch() {
    let id = JSON.parse(localStorage.getItem('selectEquipmentHistory')).id
    let response = getLocalStorageData(['staff_id'])
    response = { ...response, id }
    this.props.getEquipmentHistoryList(response)
  }
}
export default EquipmentHistoryPM
