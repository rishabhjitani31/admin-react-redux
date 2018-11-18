import React from 'react'
import presenter from 'hoc/presenter'
import { Form, Icon, Input, Button } from 'antd'
import * as Actions from 'actions/login'
import { withRouter } from 'react-router-dom'
import loginPM from './LoginPM'
import './Login.scss'
const FormItem = Form.Item

const Login = props => {
  const { getFieldDecorator } = props.form
  return (
    <div className="login-container">
      <Form onSubmit={props.pm.handleSubmit} className="login-form">
        <div className="Login-logo-container" />
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              autoComplete="off"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              autoComplete="off"
              placeholder="Password"
            />
          )}
        </FormItem>
        <span className="error-message">
          {props.loginDetails.success === 0 && props.loginDetails.message}
        </span>
        <FormItem>
          <div className="align-form-footer">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <a
              className="login-form-forgot"
              onClick={props.pm.onForgotPasswordClick}
            >
              Forgot password
            </a>
          </div>
        </FormItem>
      </Form>
    </div>
  )
}

export default withRouter(
  Form.create()(
    presenter(store => ({ loginDetails: store.login.loginDetails }), Actions)(
      loginPM,
      Login
    )
  )
)
