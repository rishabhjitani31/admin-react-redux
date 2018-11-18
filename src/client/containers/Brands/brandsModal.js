import React from 'react'
import { Modal, Form, Input, Select, Icon, Upload, Button } from 'antd'

const BrandsModal = props => {
  const { form } = props
  const uploadButton = (
    <div>
      <Icon type={props.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  return (
    <Modal
      title={props.record ? 'Edit Brand' : 'Add Brand'}
      className="add-edit-modal-container"
      visible={props.visible}
      onCancel={() => props.pm.handleModalCancel(form)}
      footer={[
        <Button key="back" onClick={() => props.pm.handleModalCancel(form)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.isBtnLoading}
          onClick={e => props.pm.handleSubmit(e, form)}
        >
          Submit
        </Button>
      ]}
    >
      <Form
        onSubmit={e => props.pm.handleSubmit(e, form)}
        className="login-form"
      >
        <Form.Item label="Select Equipment:">
          {form.getFieldDecorator('eq_id', {
            rules: [{ required: true, message: 'Select Equipment' }],
            initialValue: (props.record && props.record.eq_id) || undefined
          })(
            <Select
              showSearch
              placeholder="Select Equipment"
              optionFilterProp="children"
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
        <Form.Item label="Brand Name:">
          {form.getFieldDecorator('brand_name', {
            rules: [
              { required: true, message: 'Enter Brand Name' },
              { min: 3, message: 'Minimum 3 Character Required' }
            ],
            initialValue: props.record && props.record.brand_name
          })(<Input placeholder="Brand Name" />)}
        </Form.Item>
        <Form.Item label="Image Gallary">
          <Upload
            accept="image/*"
            action=""
            listType="picture-card"
            fileList={props.fileList}
            onChange={props.pm.handleUpload}
            onRemove={e => props.pm.handleRemove(e)}
            previewImage={props.fileList && props.fileList.url}
            previewVisible={true}
          >
            {props.fileList && props.fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(BrandsModal)
