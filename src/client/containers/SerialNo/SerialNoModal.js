import React from 'react'
import { Modal, Form, Select } from 'antd'
import CustomInsertForm from './customInsertForm'
import CustomUpdateForm from './customUpdateForm'
const SerialNoModal = props => {
  const { form } = props
  return (
    <Modal
      title={props.record ? 'Edit Serial Number' : 'Add Serial Number'}
      visible={props.visible}
      onOk={e => props.pm.handleSubmit(e, form)}
      onCancel={props.pm.handleModalCancel}
      okText="Submit"
      className="add-edit-modal-container"
    >
      <Form
        onSubmit={e => props.pm.handleSubmit(e, form)}
        className="login-form"
      >
        <Form.Item label="Select Equipment">
          {form.getFieldDecorator('eq_id', {
            rules: [{ required: true, message: 'Select Equipment' }],
            initialValue: (props.record && props.record.eq_id) || undefined
          })(
            <Select
              showSearch
              placeholder="Select Equipment"
              optionFilterProp="children"
              onSelect={props.pm.onEquipmentSelected}
            >
              {props.equipmentsList.map(val => {
                return (
                  <Select.Option key={val.eq_id} value={val.eq_id}>
                    {val.eq_name}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Select Brand">
          {form.getFieldDecorator('brand_id', {
            rules: [{ required: true, message: 'Please select Brand!' }],
            initialValue:
              props.record && props.brandslist.length
                ? props.record.brand_id
                : undefined
          })(
            <Select
              showSearch
              optionFilterProp="children"
              placeholder="Select Brand"
              onSelect={props.pm.onBrandSelected}
            >
              {props.brandFilteredValues.map(brands => {
                return (
                  <Select.Option value={brands.brand_id} key={brands.brand_id}>
                    {brands.brand_name}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Select Model">
          {form.getFieldDecorator('model_id', {
            rules: [{ required: true, message: 'Select Model' }],
            initialValue: (props.record && props.record.model_id) || undefined
          })(
            <Select
              showSearch
              placeholder="Select Model"
              optionFilterProp="children"
              onSelect={props.pm.onModelSelected}
            >
              {props.modelFilteredValues.map(val => {
                return (
                  <Select.Option key={val.model_id} value={val.model_id}>
                    {val.model_name}
                  </Select.Option>
                )
              })}
            </Select>
          )}
        </Form.Item>
        {(!props.record && <CustomInsertForm {...props} />) || (
          <CustomUpdateForm {...props} />
        )}
      </Form>
    </Modal>
  )
}

export default Form.create()(SerialNoModal)
