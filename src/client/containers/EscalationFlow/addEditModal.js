import React from 'react'
import { Modal, Form, Select } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

const AddEditModal = props => {
  const { getFieldDecorator } = props.form
  let staffList = props.staff ? props.staff.rows : []
  return (
    <Modal
      className="escalation-flow-model"
      title={!props.record ? 'Add Escalation Flow' : 'Edit Escalation Flow'}
      visible={props.visible}
      onCancel={props.pm.hideModal}
      onOk={() => props.pm.escalationFlowAddUpdate(props.record)}
    >
      <div>
        <Form className="escalation-flow-model-form">
          <FormItem label="Select staff">
            {getFieldDecorator('staff_ids', {
              rules: [{ required: true, message: 'Please select staff!' }],
              initialValue: props.record ? [`${props.record.staff_id}`] : []
            })(
              <Select
                showSearch
                optionFilterProp="children"
                placeholder="Select Equipment"
                mode={props.record ? 'default' : 'multiple'}
              >
                {staffList.map(staff => {
                  return (
                    <Option value={`${staff.person_id}`} key={staff.person_id}>
                      {staff.first_name} {staff.last_name}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="Select Hour">
            {getFieldDecorator('hours', {
              rules: [{ required: true, message: 'Please select hour!' }],
              initialValue: props.record ? props.record.hours : undefined
            })(
              <Select showSearch placeholder="Select Equipment">
                <Option value="4">4</Option>
                <Option value="8">8</Option>
                <Option value="12">12</Option>
                <Option value="18">18</Option>
                <Option value="24">24</Option>
                <Option value="48">48</Option>
              </Select>
            )}
          </FormItem>
        </Form>
      </div>
    </Modal>
  )
}

export default Form.create()(AddEditModal)
