import React from 'react'
import { Modal, Form, Input, Button } from 'antd'
import './Modal.scss'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const FormItem = Form.Item

const VerifyInvitation = props => {
  const { form, verifyInvitation } = props
  const { getFieldDecorator } = form
  return (
    <Modal
      className="verifiy-invitation"
      title="Complete your Registration"
      visible={!!verifyInvitation}
      onCancel={() => props.pm.onVerifyModalToggle(null, form)}
      footer={[
        <Button
          key="back"
          onClick={() => props.pm.onVerifyModalToggle(null, form)}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={e => props.pm.onHandleVerifySubmit(e, form)}
        >
          Submit
        </Button>
      ]}
    >
      <center>
        <div>
          Hi {verifyInvitation && verifyInvitation.first_name}{' '}
          {verifyInvitation && verifyInvitation.last_name}
        </div>
        <div>Welcome to Equinox!</div>
        <div>
          Equinox administrator has created a new account for you. Please set
          your password to complete your registration.
        </div>
      </center>
      <Form onSubmit={e => props.pm.onHandleVerifySubmit(e, form)}>
        <FormItem {...formItemLayout} label="E-mail">
          <Input value={verifyInvitation && verifyInvitation.email} readOnly />
        </FormItem>
        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!'
              },
              {
                validator: (rule, value, callback) =>
                  props.pm.validateToNextPassword(rule, value, callback, form)
              },
              {
                validator: props.pm.validatePasswordLength
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator('confirm_password', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!'
              },
              {
                validator: (rule, value, callback) =>
                  props.pm.compareToFirstPassword(rule, value, callback, form)
              }
            ]
          })(<Input type="password" />)}
        </FormItem>
        <FormItem className="hide">
          <Button type="primary" htmlType="submit" />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(VerifyInvitation)
