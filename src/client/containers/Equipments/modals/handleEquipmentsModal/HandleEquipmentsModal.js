import React from 'react'
import { Modal, Form, Input, Upload, Icon } from 'antd'
import './HandleEquipmentsModal.scss'

const FormItem = Form.Item
const HandleEquipmentsModal = props => {
  const { getFieldDecorator } = props.form
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  return (
    <Modal
      title={
        props.equipmentsHandleModalUsage === 'add'
          ? 'Add Equipments'
          : 'Edit Equipments'
      }
      visible={props.isHandleEquipmentsModalOpen}
      onCancel={() => props.pm.hideHandleEquipmentsModel(props)}
      className="handle-equipments-modal"
      okText="Submit"
      onOk={() => props.pm.addNewEquipment(props)}
      // footer={null}
    >
      <Form>
        <FormItem {...formItemLayout} label="Equipment Name">
          {getFieldDecorator('equipmentName', {
            rules: [
              {
                required: true,
                message: 'Please Enter Equipment',
                whitespace: true
              }
            ],
            initialValue:
              props.equipmentsHandleModalUsage === 'add'
                ? ''
                : props.selectedEquipment.eq_name
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Image Gallary">
          <Upload
            accept="image/*"
            action=""
            listType="picture-card"
            fileList={props.fileList}
            onChange={props.pm.handleUploadChange}
            onRemove={props.pm.handleRemove}
          >
            {props.fileList.length ? null : props.selectedImageToUpload
              .length ? (
              <img
                src={props.selectedImageToUpload}
                className="selected-img"
                alt="avatar"
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  )
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

export default Form.create()(HandleEquipmentsModal)
