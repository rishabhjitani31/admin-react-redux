class LoginPM {
  constructor(props) {
    this.props = props
  }

  onForgotPasswordClick = () => {
    this.props.history.push('/forgotPassword')
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.userLoginApi(values, this.props.history)
      }
    })
  }
}
export default LoginPM
