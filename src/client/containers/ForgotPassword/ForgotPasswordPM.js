import { message } from 'antd'
import service from 'api/forgotPasswordService'

class ForgotPasswordPM {
  constructor(props) {
    this.props = props
  }

  onLoginClick = () => {
    this.props.history.push('/login')
  }

  handleSubmit = (e, form) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        try {
          await service.forgetPassword(values)
          message.success('We have sent a reset link to your email', 5)
          form.resetFields()
          this.props.history.push('/login')
        } catch (error) {
          message.error('Error!', 3)
        }
      }
    })
  }
}
export default ForgotPasswordPM
