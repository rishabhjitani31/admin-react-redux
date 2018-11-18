import React from 'react'
import { Modal, Form, Input, Select } from 'antd'

const CityModal = props => {
  const { form } = props
  return (
    <Modal
      className="modal-container"
      title={props.record ? 'Edit City' : 'Add City'}
      visible={props.visible}
      okText="Submit"
      onOk={e => props.pm.handleSubmit(e, form)}
      onCancel={() => props.pm.handleModalCancel(form)}
    >
      <Form
        onSubmit={e => props.pm.handleSubmit(e, form)}
        className="login-form"
      >
        <Form.Item label="Select Zone">
          {form.getFieldDecorator('zone_id', {
            rules: [{ required: true, message: 'Select Zone' }],
            initialValue: (props.record && props.record.zone_id) || undefined
          })(
            <Select
              showSearch
              placeholder="Select Zone"
              optionFilterProp="children"
            >
              {props.zonelist.map(val => {
                return (
                  <Select.Option key={val.zone_id} value={val.zone_id}>
                    {val.zone_name}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="City Name">
          {form.getFieldDecorator('city_name', {
            rules: [
              { required: true, message: 'Enter City Name' },
              { min: 3, message: 'Minimum 3 Character Required' }
            ],
            initialValue: props.record && props.record.city_name
          })(<Input placeholder="Enter Name min .3 characters" />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(CityModal)
