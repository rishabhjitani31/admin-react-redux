import React from 'react'
import { Modal, Form, Input } from 'antd'

const ZoneModal = props => {
  const { form } = props
  return (
    <Modal
      className="modal-container"
      title={props.record ? 'Edit Zone' : 'Add Zone'}
      visible={props.visible}
      onOk={e => props.pm.handleSubmit(e, form)}
      onCancel={() => props.pm.handleModalCancel(form)}
      okText="Submit"
    >
      <Form
        onSubmit={e => props.pm.handleSubmit(e, form)}
        className="login-form"
      >
        <Form.Item label="Zone Name">
          {form.getFieldDecorator('zone_name', {
            rules: [
              { required: true, message: 'Enter Zone Name' },
              { min: 3, message: 'Minimum 3 Character Required' }
            ],
            initialValue: props.record && props.record.zone_name
          })(<Input placeholder="Enter Name (min. 3 characters)" />)}
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(ZoneModal)
