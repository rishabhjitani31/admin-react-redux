import React from 'react'
import { Modal, Form, Upload, Button, Icon, Spin, Input, Radio } from 'antd'
const TextArea = Input.TextArea
const RadioGroup = Radio.Group
const ReleaseApkModal = props => {
  const { form } = props
  const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
  const uploadProps = {
    accept: 'application/vnd.android.package-archive',
    action: '',
    listType: 'picture',
    onChange: props.pm.handleChange,
    customRequest: props.pm.upload,
    fileList: props.fileList
  }
  return (
    <Modal
      className="modal-container"
      title="New Release"
      visible={props.visible}
      onCancel={() => props.pm.handleModalCancel(form)}
      footer={[
        <Button
          key="back"
          onClick={() => props.pm.handleModalCancel(form)}
          disabled={props.isUploading}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.isUploading}
          disabled={!props.showForm}
          onClick={() => props.pm.handleSubmit(form)}
        >
          Submit
        </Button>
      ]}
    >
      <Form onSubmit={() => props.pm.handleSubmit(form)} className="login-form">
        {props.showForm ? (
          <div>
            <Form.Item label="Package Name">
              {form.getFieldDecorator('package', {
                rules: [],
                initialValue: props.apkData.package
              })(<Input readOnly className="input-UI-Decoration" />)}
            </Form.Item>
            <Form.Item label="Version Number">
              {form.getFieldDecorator('version_number', {
                rules: [],
                initialValue: props.apkData.versionCode
              })(<Input readOnly className="input-UI-Decoration" />)}
            </Form.Item>
            <Form.Item label="Build Version">
              {form.getFieldDecorator('build_version', {
                rules: [],
                initialValue: props.apkData.versionName
              })(<Input readOnly className="input-UI-Decoration" />)}
            </Form.Item>
            <Form.Item label="Priority">
              {form.getFieldDecorator('download_priority', {
                rules: [{ required: true, message: 'Select priority' }],
                initialValue: 2
              })(
                <RadioGroup>
                  <Radio value={1}>Immediate</Radio>
                  <Radio value={2}>At Night</Radio>
                </RadioGroup>
              )}
            </Form.Item>
            <Form.Item label="What's New">
              {form.getFieldDecorator('details', {
                rules: [{ required: true, message: 'Enter What\'s New' }]
              })(
                <TextArea
                  placeholder="Enter What's New"
                  autosize={{ minRows: 2, maxRows: 10 }}
                />
              )}
            </Form.Item>
          </div>
        ) : (
          <Form.Item label="Upload APK">
            <Spin indicator={antIcon} spinning={props.isUploading}>
              <Upload {...uploadProps}>
                <Button
                  className="ant-upload-text"
                  disabled={props.isUploading}
                >
                  <Icon type="upload" />
                  Upload
                </Button>
              </Upload>
            </Spin>
          </Form.Item>
        )}
      </Form>
    </Modal>
  )
}

export default Form.create()(ReleaseApkModal)
