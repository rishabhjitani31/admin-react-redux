import React from 'react'
import { Form, Input, Radio, Button } from 'antd'
import NumberInput from 'components/NumberInput/NumberInput'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const RadioButton = Radio.Button
import './Modal.scss'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}
const StaffInformation = props => {
  const { form, staffs, record, pm } = props
  const roles = staffs ? staffs.roles : []
  const { getFieldDecorator } = form
  return (
    <div className="staff-info">
      <FormItem label="Email" {...formItemLayout}>
        {getFieldDecorator('email', {
          rules: [
            {
              required: true,
              message: 'Enter valid email id'
            },
            {
              validator: !record && props.pm.validateEmailFromServer
            }
          ],
          initialValue: record && record.email
        })(
          <Input
            type="email"
            readOnly={record ? true : false}
            placeholder="Enter email"
          />
        )}
      </FormItem>

      <FormItem label="First Name" {...formItemLayout}>
        {getFieldDecorator('first_name', {
          rules: [
            {
              required: true,
              message: 'Please enter first name'
            }
          ],

          initialValue: record && record.first_name
        })(<Input placeholder="First name of staff" />)}
      </FormItem>

      <FormItem label="Last Name" {...formItemLayout}>
        {getFieldDecorator('last_name', {
          rules: [
            {
              required: true,
              message: 'Please enter last name'
            }
          ],
          initialValue: record && record.last_name
        })(<Input placeholder="Last name of staff" />)}
      </FormItem>

      <FormItem label="Country Code" {...formItemLayout}>
        {getFieldDecorator('country_code', {
          // rules: [
          //   {
          //     required: true,
          //     message: "Select Country"
          //   }
          // ],
          //initialValue: record ? record.country_code : '+91'
          initialValue: '+91'
        })(
          <Input readOnly /> //={record ? true : false}
          // <Select
          //   disabled
          //   showSearch
          //   placeholder="Select Country"
          //   optionFilterProp="children"
          //   style={{ width: "250px" }}
          // >
          //   {CountriesData}
          // </Select>
        )}
      </FormItem>

      <FormItem label="Phone" {...formItemLayout}>
        {getFieldDecorator('phone', {
          rules: [
            {
              required: true,
              message: 'Please enter phone number'
            },
            {
              min: 8,
              maxLength: 10,
              message: 'Phone number must be 8 to 10 digit long'
            }
          ],
          initialValue: record && record.phone
        })(<NumberInput placeholder="Contact No." maxLength="10" />)}
      </FormItem>

      <FormItem label="Role :" {...formItemLayout}>
        {getFieldDecorator('role', {
          rules: [
            {
              required: true,
              message: 'Select role'
            }
          ],
          initialValue: props.roleType
        })(
          <RadioGroup onChange={e => pm.onRoleChange(e, form)}>
            {roles.map(role => {
              return (
                <RadioButton value={role.role_key} key={role.role_key}>
                  {role.role_name}
                </RadioButton>
              )
            })}
          </RadioGroup>
        )}
      </FormItem>
      <FormItem className="hide">
        <Button type="primary" htmlType="submit" />
      </FormItem>
    </div>
  )
}

export default StaffInformation
