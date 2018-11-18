import React from 'react'
import presenter from 'hoc/presenter'
import ForgotPasswordPM from './ForgotPasswordPM'
import { Form, Icon, Input, Button } from 'antd'
import './ForgotPassword.scss'
import { withRouter } from 'react-router-dom'
const FormItem = Form.Item

const ForgotPassword = props => {
  const { getFieldDecorator } = props.form
  return (
    <div className="forgot-password-container">
      <Form
        onSubmit={e => props.pm.handleSubmit(e, props.form)}
        className="login-form"
      >
        <div className="Login-logo-container" />
        <div className="reset">
          <span className="color-red">*</span>Reset Password
        </div>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              autoComplete="off"
            />
          )}
        </FormItem>
        <FormItem>
          <div className="align-form-footer">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Reset
            </Button>
            <a className="login-form-forgot" onClick={props.pm.onLoginClick}>
              Login
            </a>
          </div>
        </FormItem>
      </Form>
    </div>
  )
}

export default withRouter(
  Form.create()(presenter(store => ({}))(ForgotPasswordPM, ForgotPassword))
)
