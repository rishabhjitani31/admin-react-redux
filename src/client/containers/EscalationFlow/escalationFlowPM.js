import service from 'api/escalationFlowService'
import { message } from 'antd'
class EscalationFlowPM {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getEscalationFlowList()
    this.props.getStaffList()
  }
  shouldComponentUpdate(props) {
    this.props = props
    return true
  }

  showModal = record => {
    this.props.getEscalationFlowVisible(true, record)
  }

  hideModal = () => {
    this.props.form.resetFields()
    this.props.getEscalationFlowVisible(false, null)
  }

  escalationFlowAddUpdate = isAdd => {
    this.props.form.validateFields(async (errors, value) => {
      if (!errors) {
        try {
          if (!isAdd) {
            await service.addEscalationFlow(value)
            message.success('Data added successfully', 3)
          } else {
            await service.editEscalationFlow(value, this.props.record)
            message.success('Data updated successfully', 3)
          }
          document.getElementById('input-search').value = ''
          this.fetch()
          this.hideModal()
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }

  confirmForDeleteScheduleMail = async record => {
    try {
      await service.deleteEscalationFlow(record)
      message.success('Data deleted successfully', 3)
      document.getElementById('input-search').value = ''
      this.fetch()
    } catch (error) {
      message.error('Error!', 3)
    }
  }
}
export default EscalationFlowPM
