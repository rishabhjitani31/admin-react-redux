import React from 'react'

import {
  Modal,
  Button,
  Icon,
  Collapse,
  Select,
  Radio,
  Input,
  Tooltip,
  DatePicker,
  Form,
  Row,
  Col
} from 'antd'
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 6 }
  }
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

const Panel = Collapse.Panel
const Option = Select.Option
const RadioGroup = Radio.Group
const EquipmentModal = props => {
  const { form } = props
  return (
    <Modal
      title={'Equipments Data'}
      visible={props.visible}
      width={700}
      className="equipment-new-form"
      onCancel={props.pm.handleModalCancel}
      footer={[
        <Button key="back" onClick={props.pm.handleModalCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={e => props.pm.handleSubmit(e, form)}
        >
          Submit
        </Button>
      ]}
    >
      <div>
        {props.equipmentForm &&
          props.equipmentForm.map((equipmentRow, key) => {
            return (
              <div key={key}>
                <Form layout="horizontal">
                  <Collapse defaultActiveKey={['0']}>
                    <Panel header={'Equipment Data'}>
                      <div>
                        {!props.record && (
                          <Tooltip placement="top" title="click to remove">
                            <Icon
                              onClick={() => props.removeEquipmentData(key)}
                              type="minus-circle-o"
                            />
                          </Tooltip>
                        )}
                      </div>
                      {/* equipment list dropdown */}
                      <Form.Item {...formItemLayout} label="Select Equipment">
                        {form.getFieldDecorator(`eq_id[${key}]`, {
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: [
                            {
                              required: true,
                              message: 'Please Select Equipment'
                            }
                          ],
                          initialValue: props.equipmentForm[key].eq_id
                        })(
                          <Select
                            showSearch
                            placeholder="Select Equipment"
                            optionFilterProp="children"
                            onChange={id =>
                              props.pm.handleEquipmentChange(id, key, form)
                            }
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {props.equipmentsList.map(row => (
                              <Option key={row.eq_id} value={row.eq_id}>
                                {row.eq_name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                      {/* brand list dropdown */}
                      <Form.Item {...formItemLayout} label="Select Brand">
                        {form.getFieldDecorator(`brand_id[${key}]`, {
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: [
                            {
                              required: true,
                              message: 'Please Select Brand'
                            }
                          ],
                          initialValue: props.equipmentForm[key].brand_id
                        })(
                          <Select
                            showSearch
                            placeholder="Select Brand"
                            optionFilterProp="children"
                            onChange={e =>
                              props.pm.handleBrandChange(e, key, form)
                            }
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {props.equipmentForm[key].brandslist.map(row => (
                              <Option key={row.brand_id} value={row.brand_id}>
                                {row.brand_name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                      {/* model list dropdown */}

                      <Form.Item {...formItemLayout} label="Select Model">
                        {form.getFieldDecorator(`model_id[${key}]`, {
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: [
                            {
                              required: true,
                              message: 'Please Select Model'
                            }
                          ],
                          initialValue: props.equipmentForm[key].model_id
                        })(
                          <Select
                            showSearch
                            placeholder="Select Model"
                            optionFilterProp="children"
                            onChange={e =>
                              props.pm.handleModelChange(e, key, form)
                            }
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {props.equipmentForm[key].modelList.map(row => (
                              <Option key={row.model_id} value={row.model_id}>
                                {row.model_name}
                              </Option>
                            ))}
                          </Select>
                        )}
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label="Select or Add New Serial No"
                      >
                        {form.getFieldDecorator(`radio_val[${key}]`, {
                          validateTrigger: ['onChange', 'onBlur'],
                          rules: [
                            {
                              required: true,
                              message: 'Please Select one'
                            }
                          ],
                          initialValue: props.equipmentForm[key].radio_val
                        })(
                          <RadioGroup
                            onChange={e =>
                              props.pm.onSerialNoselect(e, key, form)
                            }
                          >
                            <Radio value={1}>Select Serial No</Radio>
                            <Radio value={2}>New Serial No</Radio>
                          </RadioGroup>
                        )}
                      </Form.Item>
                      <Row gutter={8}>
                        <Col span={12}>
                          <Form.Item label="Select Serial No">
                            {form.getFieldDecorator(`sr_id[${key}]`, {
                              validateTrigger: ['onChange', 'onBlur'],
                              rules: [
                                {
                                  required:
                                    props.equipmentForm[key].radio_val === 1
                                      ? true
                                      : false,
                                  message: 'Please Select Serial No'
                                }
                              ],
                              initialValue:
                                props.equipmentForm[key].sr_id == ''
                                  ? undefined
                                  : props.equipmentForm[key].sr_no
                            })(
                              <Select
                                disabled={
                                  props.equipmentForm[key].radio_val === 1
                                    ? false
                                    : true
                                }
                                showSearch
                                placeholder="Select Serial No"
                                optionFilterProp="children"
                                onChange={(e, option) =>
                                  props.pm.handleSerialNoChange(
                                    e,
                                    key,
                                    option.key,
                                    form
                                  )
                                }
                                filterOption={(input, option) =>
                                  option.props.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                                }
                              >
                                {props.equipmentForm[key].serialNoList.map(
                                  row => (
                                    <Option key={row.sr_id} value={row.sr_no}>
                                      {row.sr_no}
                                    </Option>
                                  )
                                )}
                              </Select>
                            )}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="New Serial No">
                            {form.getFieldDecorator(`sr_no[${key}]`, {
                              validateTrigger: ['onChange', 'onBlur'],
                              rules: [
                                {
                                  required:
                                    props.equipmentForm[key].radio_val === 2
                                      ? true
                                      : false,
                                  message: 'Enter New Serial No'
                                }
                              ],
                              initialValue: props.equipmentForm[key].sr_no
                            })(
                              <Input
                                disabled={
                                  props.equipmentForm[key].radio_val === 2
                                    ? false
                                    : true
                                }
                                placeholder="Enter New Serial No. "
                                onChange={e =>
                                  props.pm.handleSerialInput(
                                    e.target.value,
                                    key,
                                    form
                                  )
                                }
                                onKeyPress={props.handleKeyPress}
                              />
                            )}
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={8}>
                        <Col span={12}>
                          <Form.Item label="Select Warranty(in months)">
                            {form.getFieldDecorator(`warranty_month[${key}]`, {
                              initialValue:
                                props.equipmentForm[key].warranty_month
                            })(
                              <Select
                                showSearch
                                className="smallSelect"
                                placeholder="Select Warranty"
                                optionFilterProp="children"
                                onChange={e =>
                                  props.pm.handleWarrantyChange(e, key)
                                }
                                filterOption={(input, option) =>
                                  option.props.children.indexOf(input) >= 0
                                }
                              >
                                {props.equipmentForm[
                                  key
                                ].warrantyForSrNoList.map(row => (
                                  <Option
                                    key={row.warranty_month}
                                    value={row.warranty_month}
                                  >
                                    {row.warranty_month}
                                  </Option>
                                ))}
                              </Select>
                            )}
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item label="Installation Date">
                            <DatePicker
                              format="MM-DD-YYYY"
                              value={props.equipmentForm[key].installation_date}
                              onChange={e =>
                                props.pm.handleInstallmentDataChange(e, key)
                              }
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Panel>
                  </Collapse>
                </Form>
              </div>
            )
          })}
        {!props.record && (
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button
              type="dashed"
              onClick={props.pm.addEquipmentForm}
              className="addBtn"
              style={{ width: '60%' }}
            >
              <Icon type="plus" /> Add field
            </Button>
          </Form.Item>
        )}
      </div>
    </Modal>
  )
}
export default Form.create()(EquipmentModal)
