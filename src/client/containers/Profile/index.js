import React from 'react'
import presenter from 'hoc/presenter'
import ProfilePM from './profilePM'
import ContainerLayout from 'components/ContainerLayout'
import ContainerHeader from 'components/ContainerHeader'
import { Form, Input, Button } from 'antd'
import { getLocalStorageData } from 'utils/localStorage'
import NumberInput from 'components/NumberInput/NumberInput'
import './profile.scss'

const Profile = props => {
  const { form } = props
  const {
    first_name,
    last_name,
    email,
    country_code,
    phone
  } = getLocalStorageData([
    'first_name',
    'last_name',
    'email',
    'country_code',
    'phone'
  ])
  return (
    <div className="profile">
      <ContainerHeader title="Profile" />
      <ContainerLayout>
        <Form
          onSubmit={e => props.pm.handleSubmit(e, form)}
          className="login-form"
        >
          <Form.Item label="First Name">
            {form.getFieldDecorator('first_name', {
              rules: [{ required: true, message: 'Please provide first name' }],
              initialValue: first_name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {form.getFieldDecorator('last_name', {
              rules: [{ required: true, message: 'Please provide last name' }],
              initialValue: last_name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Email">
            {form.getFieldDecorator('email', {
              rules: [{ required: true }],
              initialValue: email
            })(<Input readOnly />)}
          </Form.Item>
          <Form.Item label="Country Code">
            {form.getFieldDecorator('country_code', {
              rules: [{ required: false }],
              initialValue: country_code
            })(<Input readOnly />)}
          </Form.Item>
          <Form.Item label="Phone#">
            {form.getFieldDecorator('phone', {
              rules: [
                { required: true, message: 'Please Enter Phone number' },
                { min: 8, message: 'Phone number must be 8 to 10 digit long' }
              ],
              initialValue: phone
            })(<NumberInput placeholder="Contact No." maxLength="10" />)}
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
export default Form.create()(presenter(store => ({}))(ProfilePM, Profile))
