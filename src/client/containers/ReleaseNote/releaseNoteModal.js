import React from 'react'
import { Modal, Form, Input, Switch, DatePicker, Row, Col, Button } from 'antd'
import CKEditor from 'react-ckeditor-component'
import moment from 'moment'

const FormItem = Form.Item

const ReleaseNoteModal = props => {
  const { form } = props
  return (
    <Modal
      title={props.record ? 'Edit Release Note' : 'Add Release Note'}
      visible={props.visible}
      onCancel={e => props.pm.handleModalCancel(e, props.form)}
      width={700}
      footer={[
        <Button key="back" onClick={props.pm.handleModalCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.btnLoading}
          onClick={e => props.pm.handleSubmit(e, props.form)}
          htmlType="submit"
        >
          Submit
        </Button>
      ]}
    >
      <Form
        className="ant-advanced-search-form"
        onSubmit={e => props.pm.handleSubmit(e, props.form)}
      >
        <FormItem label="Title">
          {form.getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: 'Enter Title'
              }
            ],
            initialValue:
              props.record && props.record.title ? props.record.title : ''
          })(<Input placeholder="Enter Title" />)}
        </FormItem>

        <FormItem label="Version">
          {form.getFieldDecorator('version', {
            rules: [
              {
                required: true,
                message: 'Enter Version'
              }
            ],
            initialValue:
              props.record && props.record.version ? props.record.version : ''
          })(<Input placeholder="Enter Version" />)}
        </FormItem>
        <Row>
          <Col span={12}>
            <FormItem label="Release Date">
              {form.getFieldDecorator('release_date', {
                rules: [
                  {
                    required: true,
                    message: 'Enter Release Date'
                  }
                ],
                initialValue:
                  props.record && props.record.release_date
                    ? moment(props.record.release_date)
                    : moment(moment().locale('en'))
              })(<DatePicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label="Active">
              {form.getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue:
                  props.record && props.record.status
                    ? props.record.status
                    : false
              })(<Switch />)}
            </FormItem>
          </Col>
        </Row>

        <FormItem label="Description">
          <CKEditor
            activeClass="p10"
            content={props.description}
            events={{
              change: e => props.pm.onChange(e, props.record)
            }}
          />
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(ReleaseNoteModal)
