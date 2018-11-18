import React from 'react'
import { Modal, Form, Input, Select, Upload, Button, Icon } from 'antd'
const Option = Select.Option

const AppModal = props => {
  const { form } = props
  const uploadButton = (
    <div>
      <Icon type={props.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  return (
    <Modal
      className="modal-container"
      title={props.record ? 'Edit App' : 'Add App'}
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
        <Form.Item label="App Name:">
          {form.getFieldDecorator('app_name', {
            rules: [
              { required: true, message: 'Enter App Name' },
              { min: 3, message: 'Minimum 3 Character Required' }
            ],
            initialValue: props.record && props.record.app_name
          })(<Input placeholder="Enter App Name" />)}
        </Form.Item>
        <Form.Item label="Category">
          {form.getFieldDecorator('category_id', {
            rules: [{ required: true, message: 'Select Category' }],
            initialValue:
              (props.record && props.record.category_id) || undefined
          })(
            <Select
              showSearch
              placeholder="Select Category:"
              optionFilterProp="children"
            >
              <Option value={1}>System</Option>
              <Option value={2}>Tablet</Option>
              <Option value={3}>Staff</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Package Name:">
          {form.getFieldDecorator('package_name', {
            rules: [
              { required: true, message: 'Enter Package Name' },
              { min: 3, message: 'Minimum 3 Character Required' }
            ],
            initialValue: props.record && props.record.package_name
          })(<Input placeholder="Enter Package Name" />)}
        </Form.Item>
        <Form.Item label="Image Gallary">
          <Upload
            accept="image/*"
            action=""
            listType="picture-card"
            fileList={props.fileList}
            onChange={props.pm.handleUpload}
            onRemove={props.pm.handleRemove}
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

export default Form.create()(AppModal)
