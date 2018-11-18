import { message } from 'antd'
import service from 'api/changePasswordService'

class ChangePasswordPM {
  constructor(props) {
    this.props = props
  }

  validatePasswordLength = (rule, value, callback) => {
    if (value && (value.trim().length >= 4 || !value.length)) {
      if (value && (value.trim().length <= 15 || !value.length)) {
        callback()
      } else {
        callback('Password must not be greater than 15 characters long')
      }
    } else {
      callback('Password must be at least 4 characters long')
    }
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const response = await service.changePassword(values)
          if (response.success === 1) {
            message.success('Password Successfully Changed', 3)
            form.resetFields()
          } else {
            message.error(response.message)
          }
        } catch (error) {
          message.error('Error in resetting the password', 3)
        }
      }
    })
  }
}
export default ChangePasswordPM
