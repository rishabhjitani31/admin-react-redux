import React from 'react'
import { Form, Select, Input, Switch } from 'antd'
import './SerialNo.scss'

const Option = Select.Option

const CustomUpdateForm = props => {
  const { form } = props
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Form.Item label="Serial No">
        {form.getFieldDecorator('sr_no', {
          rules: [
            { required: true, message: 'enter serial no' },
            {
              max: 16,
              message: 'Serial No length is limited to 16 characters'
            }
          ],
          initialValue: props.record.sr_no
        })(
          <Input
            className="input-UI-Decoration"
            placeholder="Enter Serial No."
            // onChange={() => props.pm.updateSerialNo()}
          />
        )}
      </Form.Item>
      <Form.Item label="Select Warranty">
        {form.getFieldDecorator('warranty_month', {
          // rules: [{ required: true, message: "enter serial no" }],
          initialValue: props.record.warranty_month
        })(
          <Select
            showSearch
            placeholder="Select Warranty"
            optionFilterProp="children"
          >
            {props.warrantyMonths.map(hour => (
              <Option value={hour} key={hour}>
                {hour}
              </Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="Activate">
        {form.getFieldDecorator('active', {
          valuePropName: 'checked',
          initialValue: props.record.active
        })(<Switch />)}
      </Form.Item>
    </div>
  )
}

export default CustomUpdateForm
