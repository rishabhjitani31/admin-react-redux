import React from 'react'
import { Modal, Form, Input, Upload, Icon, Button } from 'antd'

const CustomerModal = props => {
  const { form } = props
  const uploadButton = (
    <div>
      <Icon type={props.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  return (
    <Modal
      title={props.record ? 'Edit Customer' : 'Add New Customer'}
      visible={props.visible}
      className="modal-container"
      onCancel={() => props.pm.handleModalCancel(form)}
      footer={[
        <Button key="back" onClick={() => props.pm.handleModalCancel(form)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.isFetching}
          onClick={e => props.pm.handleSubmit(e, form)}
        >
          Submit
        </Button>
      ]}
    >
      <Form onSubmit={e => props.pm.handleSubmit(e, form)}>
        <Form.Item label="Customer Name">
          {form.getFieldDecorator('customer_name', {
            rules: [
              { required: true, message: 'Enter Customer Name' },
              { min: 3, message: 'Minimum 3 Character Required' }
            ],
            initialValue: props.record && props.record.customer_name
          })(<Input placeholder="Enter Name (min. 3 characters)" />)}
        </Form.Item>
        <Form.Item>
          <Form.Item>
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
              {props.fileList && props.fileList.length >= 1
                ? null
                : uploadButton}
            </Upload>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Form.create()(CustomerModal)
