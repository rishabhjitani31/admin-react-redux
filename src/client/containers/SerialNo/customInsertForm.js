import React from 'react'
import { Form, Select, Button, Icon, Input } from 'antd'
import './SerialNo.scss'

const Option = Select.Option

const CustomInsertForm = props => {
  const { form } = props
  return (
    <div>
      {props.keys.map((val, index) => {
        return (
          <div className="align-form-items" key={index}>
            <Form.Item label="Serial no">
              {form.getFieldDecorator(`sr_no[${val.key}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: 'Please input serial no'
                  },
                  {
                    max: 16,
                    message: 'Serial No length is limited to 16 characters'
                  }
                ]
              })(
                <Input
                  placeholder="serial no"
                  className="align-input-serial-no"
                />
              )}
            </Form.Item>
            <Form.Item label="Select Warranty(in months)" className="width-100">
              {form.getFieldDecorator(`warranty_month[${val.key}]`, {})(
                <Select
                  placeholder="Select Warranty(in months)"
                  optionFilterProp="children"
                  className="align-select-warranty"
                >
                  {props.warrantyMonths.map(hour => (
                    <Option value={hour} key={hour}>
                      {hour}
                    </Option>
                  ))}
                </Select>
              )}
              {props.keys.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={props.keys.length === 1}
                  onClick={() => props.pm.remove(val.key)}
                />
              ) : null}
            </Form.Item>
          </div>
        )
      })}
      <Form.Item>
        <Button
          type="dashed"
          onClick={() =>
            props.onAddSerialNo(props.totalSerialNos, {
              serialNo: null,
              month: null
            })
          }
        >
          <Icon type="plus" /> Add Serial No
        </Button>
      </Form.Item>
    </div>
  )
}

export default CustomInsertForm
