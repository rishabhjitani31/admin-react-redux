import React from 'react'
import { Modal, Form, Input, Select } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

const AddEditModal = props => {
  const { getFieldDecorator } = props.form
  return (
    <Modal
      title={!props.record ? 'Add Model' : 'Edit Model'}
      visible={props.visible}
      className="add-edit-modal-container"
      onOk={() => props.pm.modelAddUpdate(props.record)}
      onCancel={props.pm.hideModal}
      okText="Submit"
    >
      <div className="modal-body">
        <Form style={{ width: '100%' }}>
          <FormItem label="Select Equipment">
            {getFieldDecorator('eq_id', {
              rules: [{ required: true, message: 'Please Select Equipment!' }],
              initialValue:
                props.selectedValue.eq_id == ''
                  ? undefined
                  : props.selectedValue.eq_id
            })(
              <Select
                optionFilterProp="children"
                showSearch
                placeholder="Select Equipment"
                onSelect={value =>
                  props.pm.onselectEquipment(value, props.form)
                }
              >
                {props.equipmentList.map(equipments => {
                  return (
                    <Option value={equipments.eq_id} key={equipments.eq_id}>
                      {equipments.eq_name}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="Select Brand">
            {getFieldDecorator('brand_id', {
              rules: [{ required: true, message: 'Please select Brand!' }],
              initialValue:
                props.selectedValue.brand_id == ''
                  ? undefined
                  : props.selectedValue.brand_id
            })(
              <Select
                onChange={value => props.pm.handleSelectBrandChange(value)}
                showSearch
                optionFilterProp="children"
                placeholder="Select Brand"
              >
                {props.brandslist.map(brands => {
                  return (
                    <Option value={brands.brand_id} key={brands.brand_id}>
                      {brands.brand_name}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="Model Name">
            {getFieldDecorator('model_name', {
              rules: [{ required: true, message: 'Please Enter Model Name!' }],
              initialValue:
                props.selectedValue.model_name == ''
                  ? undefined
                  : props.selectedValue.model_name
            })(
              <Input
                placeholder="Enter Name (min 3 characters)"
                onChange={e => props.pm.handleSelectModelChange(e.target.value)}
              />
            )}
          </FormItem>
        </Form>
      </div>
    </Modal>
  )
}

export default Form.create()(AddEditModal)
