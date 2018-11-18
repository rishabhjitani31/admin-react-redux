import React from 'react'
import {
  Modal,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  Icon,
  Upload
} from 'antd'
import { getLocalStorageData } from 'utils/localStorage'

const FormItem = Form.Item
const Option = Select.Option
const TextArea = Input.TextArea
const workOrderModal = props => {
  const { form } = props
  const uploadButton = (
    <div>
      <Icon type={props.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  const CustomerData = props.customerlist
    ? props.customerlist.map(({ customer_id, customer_name }) => (
        <Option value={customer_id} key={customer_id}>
          {customer_name}
        </Option>
      ))
    : []
  const OutletData = props.outletList
    ? props.outletList.map(item => {
        return (
          <Option key={item.apt_id} value={item.apt_id}>
            {item.apt_name}
          </Option>
        )
      })
    : []
  const StaffData = props.staffList
    ? props.staffList.map((item, i) => {
        return (
          <Option key={i} value={item.staff_id}>
            {item.first_name} {item.last_name || null} ({item.user_role})
          </Option>
        )
      })
    : []
  const EquipmentsData = props.equipmentsList
    ? props.equipmentsList.map(({ eq_id, eq_name }) => (
        <Option value={eq_id} key={eq_id}>
          {eq_name}
        </Option>
      ))
    : []
  const BrandsData = props.brandsList
    ? props.brandsList.map(({ brand_id, brand_name }) => (
        <Option value={brand_id} key={brand_id}>
          {brand_name}
        </Option>
      ))
    : []
  const ModelsData = props.modelsList
    ? props.modelsList.map(({ model_id, model_name }) => (
        <Option value={model_id} key={model_id}>
          {model_name}
        </Option>
      ))
    : []
  const SerialNosData = props.srnosList
    ? props.srnosList.map(({ sr_no }) => (
        <Option value={sr_no} key={sr_no}>
          {sr_no}
        </Option>
      ))
    : []
  const IssuesData = props.issuesList
    ? props.issuesList.map(({ title, id }) => (
        <Option value={id} key={id}>
          {title}
        </Option>
      ))
    : []
  const { last_customer, last_customer_name } = getLocalStorageData([
    'last_customer',
    'last_customer_name'
  ])
  return (
    <Modal
      title="Add Work Order Issue"
      visible={props.modalVisibe}
      onCancel={() => props.pm.handleModalCancel(form)}
      width={700}
      className="workorder-modal"
      footer={[
        <Button key="back" onClick={() => props.pm.handleModalCancel(form)}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.isBtnLoading}
          onClick={e => props.pm.handleSubmit(e, form)}
          htmlType="submit"
        >
          Submit
        </Button>
      ]}
    >
      <Form>
        <Row gutter={10}>
          {!last_customer || last_customer === 0 ? (
            <Col span={8}>
              <FormItem label="Select Customer">
                {form.getFieldDecorator('customer_id', {
                  rules: [
                    { required: true, message: 'Please Select Customer!' }
                  ]
                })(
                  <Select
                    showSearch
                    placeholder="Select Customer"
                    optionFilterProp="children"
                    onSelect={value => props.pm.customerSelected(value, form)}
                  >
                    {CustomerData}
                  </Select>
                )}
              </FormItem>
            </Col>
          ) : (
            <Col span={8}>
              <FormItem label="Customer:">
                {form.getFieldDecorator('customer_id', {
                  initialValue: last_customer_name
                })(<Input readOnly placeholder="Customer" />)}
              </FormItem>
            </Col>
          )}
          <Col span={8}>
            <FormItem label="Select Outlet: ">
              {form.getFieldDecorator('apt_id', {
                rules: [{ required: true, message: 'Please Select an Outlet!' }]
              })(
                <Select
                  showSearch
                  name="apt_id"
                  optionFilterProp="children"
                  placeholder="Select Outlet"
                  onSelect={value => props.pm.outletSelected(value, form)}
                >
                  {OutletData}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Select Assignee :">
              {form.getFieldDecorator('assignee_id', {
                rules: [
                  { required: true, message: 'Please Select an Assignee!' }
                ]
              })(
                <Select
                  showSearch
                  name="assignee_id"
                  optionFilterProp="children"
                  placeholder="Select Issue Assignee"
                >
                  {StaffData}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={11}>
            <FormItem label="Select Equipment">
              {form.getFieldDecorator('eq_id')(
                <Select
                  showSearch
                  placeholder="Select Equipment"
                  optionFilterProp="children"
                  onSelect={value => props.pm.equipmentSelected(value, form)}
                >
                  {EquipmentsData}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={1}>Or</Col>
          <Col span={12}>
            <FormItem label="Input Equipment">
              {form.getFieldDecorator('custom_eq_name')(
                <Input
                  placeholder="Enter Equipment name"
                  onChange={e => props.pm.onEquipmentInputChange(e, form)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={11}>
            <FormItem label="Select Brand">
              {form.getFieldDecorator('brand_id')(
                <Select
                  showSearch
                  placeholder="Select Brand"
                  optionFilterProp="children"
                  onSelect={value => props.pm.brandSelected(value, form)}
                >
                  {BrandsData}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={1}>Or</Col>
          <Col span={12}>
            <FormItem label="Input Brand">
              {form.getFieldDecorator('custom_brand_name')(
                <Input
                  placeholder="Enter Brand name"
                  onChange={e => props.pm.onBrandInputChange(e, form)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={11}>
            <FormItem label="Select Model">
              {form.getFieldDecorator('model_id')(
                <Select
                  showSearch
                  placeholder="Select Model"
                  optionFilterProp="children"
                  onSelect={value => props.pm.modelSelected(value, form)}
                >
                  {ModelsData}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={1}>Or</Col>
          <Col span={12}>
            <FormItem label="Input Model">
              {form.getFieldDecorator('custom_model_name')(
                <Input
                  placeholder="Enter Modal name"
                  onChange={e => props.pm.onModelInputChange(e, form)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={11}>
            <FormItem label="Select Serial No">
              {form.getFieldDecorator('sr_no')(
                <Select
                  showSearch
                  placeholder="Select Serial no."
                  optionFilterProp="children"
                  onSelect={() => props.pm.serialNoSelected(form)}
                >
                  {SerialNosData}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={1}>Or</Col>
          <Col span={12}>
            <FormItem label="Enter Serial No">
              {form.getFieldDecorator('custom_sr_no', {
                rules: [
                  {
                    max: 16,
                    message: 'Serial No length is limited to 16 characters'
                  }
                ]
              })(
                <Input
                  placeholder="Enter Serial No."
                  onChange={e => props.pm.onSrNoInputChange(e, form)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={11}>
            <FormItem label="Select Issue">
              {form.getFieldDecorator('title', {
                rules: [
                  {
                    required: form.getFieldValue('title'),
                    message: 'Please Enter or Select an Issue'
                  }
                ]
              })(
                <Select
                  showSearch
                  placeholder="Select Issue"
                  optionFilterProp="children"
                  onSelect={(value, option) =>
                    props.pm.issueSelected(value, option, form)
                  }
                >
                  {IssuesData}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={1}>Or</Col>
          <Col span={12}>
            <FormItem label="Enter Issue">
              {form.getFieldDecorator('custom_title', {
                rules: [
                  {
                    required: !form.getFieldValue('title'),
                    message: 'Please Enter or Select an Issue'
                  }
                ]
              })(
                <Input
                  placeholder="Enter Issue"
                  onChange={e => props.pm.onissueInputChange(e, form)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <FormItem label="Description :">
          {form.getFieldDecorator('description')(
            <TextArea
              rows={3}
              name="description"
              placeholder="Issue Description"
            />
          )}
        </FormItem>
        <FormItem label="Image Gallary">
          <Upload
            accept="image/*"
            action=""
            listType="picture-card"
            fileList={props.fileList}
            onChange={props.pm.handleUpload}
            onRemove={props.pm.handleImageRemove}
            previewImage={props.fileList && props.fileList.url}
            previewVisible={true}
          >
            {props.fileList && props.fileList.length >= 5 ? null : uploadButton}
          </Upload>
        </FormItem>
      </Form>
    </Modal>
  )
}

export default Form.create()(workOrderModal)
