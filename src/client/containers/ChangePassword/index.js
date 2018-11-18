import React from 'react'
import presenter from 'hoc/presenter'
import ChangePasswordPM from './changePasswordPM'
import ContainerLayout from 'components/ContainerLayout'
import ContainerHeader from 'components/ContainerHeader'
import { Form, Input, Button } from 'antd'
import './changePassword.scss'

const ChangePassword = props => {
  const { form } = props
  return (
    <div className="change-password">
      <ContainerHeader title="Change Password" />
      <ContainerLayout>
        <Form
          onSubmit={e => props.pm.handleSubmit(e, form)}
          className="login-form ant-col-offset-6 ant-col-sm-12 "
        >
          <Form.Item label="Current Password">
            {form.getFieldDecorator('current_password', {
              rules: [
                {
                  required: true,
                  message: 'Please provide current password. '
                },
                {
                  validator: props.pm.validatePasswordLength
                }
              ]
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item label="New Password">
            {form.getFieldDecorator('new_password', {
              rules: [
                { required: true, message: 'Please provide new password. ' },
                {
                  validator: props.pm.validatePasswordLength
                }
              ]
            })(<Input type="password" />)}
          </Form.Item>
          <Form.Item label="Confirm New Password">
            {form.getFieldDecorator('confirm_password', {
              rules: [
                { required: true, message: 'Please provide a password. ' },
                {
                  validator: props.pm.validatePasswordLength
                }
              ]
            })(<Input type="password" />)}
          </Form.Item>
          <div className="align-button">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </ContainerLayout>
    </div>
  )
}
export default Form.create()(
  presenter(store => ({}))(ChangePasswordPM, ChangePassword)
)
