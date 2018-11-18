import service from 'api/tabletStatusService'
import { message } from 'antd'
class TabletStatusPM {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getTabletStatusList()
  }
  onReloadTabletStatus = record => {
    service.refreshTablet(record).then(resp => {
      if (resp.success === 1) {
        message.success('Tablet data has been updated')
      } else {
        message.error('Error')
      }
    })
  }
  onRebootTabletStatus = record => {
    service.rebootTablet(record).then(resp => {
      if (resp.success === 1) {
        message.success('Tablet has been rebooted')
      } else {
        message.error('Error')
      }
    })
  }

  refreshAllRecordsTabletStatus = () => {
    service.refreshAllRecords().then(resp => {
      if (resp.success === 1) {
        message.success('Tablet data has been updated')
      } else {
        message.error('Error')
      }
    })
  }
}
export default TabletStatusPM
