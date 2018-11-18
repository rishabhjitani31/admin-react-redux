import React from 'react'
import { Modal, Form, Button, Input, Row, Col, Checkbox, Icon } from 'antd'
import moment from 'moment'
import columns from './reportColumns'
import TableContainer from 'components/TableContainer'
const FormItem = Form.Item

const reportModal = props => {
  const { form } = props
  const custPrefixSelector = !props.reportDetail.receipt_id
    ? props.reportDetail.country_code !== null ||
      props.reportDetail.country_code !== undefined
      ? props.reportDetail.country_code
      : '+91'
    : props.reportDetail.customer_phone.slice(0, 3)
  const assgineePrefixSelector = !props.reportDetail.receipt_id
    ? props.reportDetail.assignee_country_code !== null ||
      props.reportDetail.assignee_country_code !== undefined
      ? props.reportDetail.assignee_country_code
      : '+91'
    : props.reportDetail.assignee_phone.slice(0, 3)
  return (
    <Modal
      title={props.reportDetail.receipt_id ? 'Edit Report' : 'Add Report'}
      className="workorder-modal"
      width={700}
      visible={props.reportModalVisible}
      onCancel={e => props.pm.handleReportModalCancel(e, props.form)}
      footer={[
        <Button
          key="back"
          onClick={e => props.pm.handleReportModalCancel(e, props.form)}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.isBtnLoading}
          onClick={props.pm.handleReportSubmit(
            props.form,
            props.partsReplaced,
            props.reportDetail
          )}
          htmlType="submit"
        >
          Submit
        </Button>
      ]}
    >
      <Form>
        <h3>
          <b>Service Staff Details</b>
        </h3>
        <Row gutter={5}>
          <FormItem label="Service Type">
            {form.getFieldDecorator('service_type', {
              initialValue: props.reportDetail.receipt_id
                ? props.reportDetail.service_type &&
                  props.reportDetail.service_type.length
                  ? props.reportDetail.service_type
                  : [1]
                : [1]
            })(
              <Checkbox.Group onChange={e => props.onserviceTypeChange(e)}>
                <Row>
                  <Col span={8}>
                    <Checkbox value={1}>
                      <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
                        Service Call Report
                      </span>
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={2}>
                      <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
                        Preventive Maintenance
                      </span>
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={3}>
                      <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
                        Hand Over Report
                      </span>
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={4}>
                      <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
                        Installation Commisstioning
                      </span>
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox value={5}>
                      <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>
                        Other
                      </span>
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            )}
          </FormItem>
        </Row>
        {props.serviceType &&
          props.serviceType.length &&
          props.serviceType.indexOf(5) != -1 && (
            <Row gutter={5}>
              <FormItem label="Other">
                {form.getFieldDecorator('other_service_name', {
                  rules: [{ required: true, message: 'Enter Other Name' }],
                  initialValue: props.reportDetail.receipt_id
                    ? props.reportDetail.other_service_name
                    : ''
                })(<Input placeholder="Enter Name" />)}
              </FormItem>
            </Row>
          )}
        <Row gutter={5}>
          <Col span={6}>
            <FormItem label="Name">
              {form.getFieldDecorator('assignee_name', {
                initialValue: !props.reportDetail.receipt_id
                  ? props.reportDetail.assignee_first_name +
                    ' ' +
                    props.reportDetail.assignee_last_name
                  : props.reportDetail.assignee_name
              })(<Input readOnly placeholder="Enter Name" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Contact No">
              {form.getFieldDecorator('assignee_phone', {
                initialValue:
                  props.reportDetail.assignee_phone &&
                  props.reportDetail.assignee_phone.indexOf('+') >= 0
                    ? props.reportDetail.assignee_phone.slice(3)
                    : props.reportDetail.assignee_phone
              })(
                <Input
                  readOnly
                  addonBefore={assgineePrefixSelector}
                  placeholder="Enter Contact No"
                />
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Time Arrived">
              {form.getFieldDecorator('time_arrive', {
                initialValue: moment(props.reportDetail.ticket_start).format(
                  'MM-DD-YYYY HH:mm'
                )
              })(<Input readOnly placeholder="Enter Time Arrived" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Time Left">
              {form.getFieldDecorator('time_left', {
                initialValue: moment(props.reportDetail.ticket_complete).format(
                  'MM-DD-YYYY HH:mm'
                )
              })(<Input readOnly placeholder="Enter Time Left" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={6}>
            <FormItem label="Equipment">
              {form.getFieldDecorator('eq_name', {
                initialValue:
                  props.reportDetail.eq_name &&
                  props.reportDetail.eq_name != 'null'
                    ? props.reportDetail.eq_name
                    : props.reportDetail.custom_eq_name &&
                      props.reportDetail.custom_eq_name != 'null'
                      ? props.reportDetail.custom_eq_name
                      : '--'
              })(<Input readOnly placeholder="Enter Equipment Name" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Brand">
              {form.getFieldDecorator('brand_name', {
                initialValue:
                  props.reportDetail.brand_name &&
                  props.reportDetail.brand_name != 'null'
                    ? props.reportDetail.brand_name
                    : props.reportDetail.custom_brand_name &&
                      props.reportDetail.custom_brand_name != 'null'
                      ? props.reportDetail.custom_brand_name
                      : '--'
              })(<Input readOnly placeholder="Enter Brand Name" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Model">
              {form.getFieldDecorator('model_name', {
                initialValue:
                  props.reportDetail.model_name &&
                  props.reportDetail.model_name != 'null'
                    ? props.reportDetail.model_name
                    : props.reportDetail.custom_model_name &&
                      props.reportDetail.custom_model_name != 'null'
                      ? props.reportDetail.custom_model_name
                      : '--'
              })(<Input readOnly placeholder="Enter Model Name" />)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem label="Unit Sr No">
              {form.getFieldDecorator('sr_no', {
                initialValue:
                  props.reportDetail.sr_no && props.reportDetail.sr_no != 'null'
                    ? props.reportDetail.sr_no
                    : props.reportDetail.custom_sr_no &&
                      props.reportDetail.custom_sr_no != 'null'
                      ? props.reportDetail.custom_sr_no
                      : '--'
              })(<Input readOnly placeholder="Enter Sr No" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col span={19}>
            <FormItem label="Nature of complaint">
              {form.getFieldDecorator('nature_complain', {
                initialValue: !props.reportDetail.receipt_id
                  ? props.reportDetail.title
                  : props.reportDetail.nature_complain
              })(<Input readOnly placeholder="Enter Location Name" />)}
            </FormItem>
          </Col>
          <Col span={5}>
            <FormItem label="Is Warranty">
              {form.getFieldDecorator('isWarrenty', {
                initialValue:
                  props.reportDetail.isWarrenty == 'true'
                    ? 'Yes'
                    : props.reportDetail.isWarrenty == 'false' ? 'No' : '--'
              })(<Input readOnly placeholder="Is Warranty" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={5}>
          <FormItem label="Service rendered">
            {form.getFieldDecorator('service_render', {
              initialValue: props.reportDetail.receipt_id
                ? props.reportDetail.service_render
                : ''
            })(<Input placeholder="Enter Service rendered" />)}
          </FormItem>
        </Row>
        <h3>
          <b>Customer Details</b>
        </h3>
        <Row gutter={5}>
          <Col span={8}>
            <FormItem label="Customer">
              {form.getFieldDecorator('eq_customer', {
                initialValue: !props.reportDetail.receipt_id
                  ? props.reportDetail.customer_name
                  : props.reportDetail.eq_customer
              })(<Input readOnly placeholder="Enter Location Name" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Location">
              {form.getFieldDecorator('apt_name', {
                initialValue: props.reportDetail.apt_name
              })(<Input readOnly placeholder="Enter Location Name" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Customer Contact No">
              {form.getFieldDecorator('customer_phone', {
                rules: [
                  { required: true, message: 'Enter Customer Contact No' },
                  {
                    min: 8,
                    max: 10,
                    message: 'Phone number must be 8 to 10 digit long'
                  }
                ],
                initialValue:
                  props.reportDetail.customer_phone &&
                  (props.reportDetail.customer_phone !== null ||
                    props.reportDetail.customer_phone !== undefined)
                    ? props.reportDetail.customer_phone.indexOf('+') >= 0
                      ? props.reportDetail.customer_phone.slice(3)
                      : props.reportDetail.customer_phone
                    : ''
              })(
                <Input
                  addonBefore={custPrefixSelector}
                  placeholder="Enter Customer Contact No"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={5}>
          <FormItem label="Important Notes">
            {form.getFieldDecorator('imp_notes', {
              initialValue: props.reportDetail.receipt_id
                ? props.reportDetail.imp_notes
                : ''
            })(<Input placeholder="Enter Important Notes" />)}
          </FormItem>
        </Row>
        <h3>
          <b>Parts Replaced</b>
        </h3>
        <TableContainer
          filterByFields={[]}
          tableProps={{
            dataSource: props.partsReplaced,
            columns: columns(props.pm),
            rowKey: record => record.part_no,
            pagination: false
          }}
        />
        {props.showPartsInpuFields && (
          <div>
            <Row gutter={5}>
              <Col span={12}>
                <Input
                  placeholder="Enter description"
                  value={props.description}
                  onChange={e => props.handleDescriptionChange(e)}
                />
              </Col>
              <Col span={5}>
                <Input
                  placeholder="Enter Part No"
                  value={props.partNo}
                  onChange={e => props.handlePartNoChange(e)}
                />
              </Col>
              <Col span={5}>
                <Input
                  placeholder="Enter quantity"
                  value={props.quantity}
                  onChange={e => props.handleQtyChange(e)}
                />
              </Col>
              <Col span={1}>
                <Icon
                  className="i"
                  type="check"
                  onClick={props.pm.AddPartsData}
                />
              </Col>
              <Col span={1}>
                <Icon
                  className="i"
                  type="close"
                  onClick={props.pm.handlePartsDataCancel}
                />
              </Col>
            </Row>
          </div>
        )}
        <Button
          type="dashed"
          disabled={props.showPartsInpuFields}
          onClick={() => props.showPartsDataInpuFields(true)}
        >
          +Add Other
        </Button>
      </Form>
    </Modal>
  )
}

export default Form.create()(reportModal)
