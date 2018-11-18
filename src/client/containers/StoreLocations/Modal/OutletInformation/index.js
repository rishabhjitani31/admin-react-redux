import React from 'react'
import { Select, Switch, Input, DatePicker, Form, Button, Icon } from 'antd'
import moment from 'moment'
import OutletInformationPm from './outletInformationPM'
import * as storeLocationsActions from 'actions/storeLocations'
import * as customerActions from 'actions/customer'
import * as cityActions from 'actions/city'
import * as zoneActions from 'actions/zone'
import * as mainHeaderActions from 'actions/mainHeader'
import presenter from 'hoc/presenter'
import ContainerLayout from 'components/ContainerLayout'
import './outletInformation.scss'

import ContainerHeader from 'components/ContainerHeader'
const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}

const OutletInformation = props => {
  const { getFieldDecorator } = props.form
  const aptDetail = JSON.parse(localStorage.getItem('aptDetail'))
  return (
    <div className="outletInformation-container">
      <ContainerHeader title="Outlet Information" />
      <ContainerLayout>
        <Form onSubmit={e => props.pm.handleSubmit(e, props.form)}>
          <FormItem {...formItemLayout} label="Customer">
            {getFieldDecorator('customer_id', {
              rules: [{ required: true, message: 'Select Customer' }],
              initialValue: props.lastCustomer
                ? props.lastCustomer
                : (aptDetail && aptDetail.customer_id) || undefined
            })(
              <Select
                disabled={!!props.lastCustomer}
                showSearch
                placeholder="Select Customer"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.customerList.map(row => (
                  <Option key={row.customer_id} value={row.customer_id}>
                    {row.customer_name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>

          <FormItem {...formItemLayout} label="Outlet Name">
            {getFieldDecorator('apt_name', {
              rules: [
                {
                  required: true,
                  message: 'Enter Outlet Number'
                },
                {
                  max: 16,
                  message: 'Outlet Name length is limited to 16 characters'
                }
              ],
              initialValue: (aptDetail && aptDetail.apt_name) || ''
            })(<Input placeholder="Enter Outlet Name" />)}{' '}
          </FormItem>
          <FormItem {...formItemLayout} label="Outlet Activate">
            {getFieldDecorator('active', {
              valuePropName: 'checked',
              initialValue: (aptDetail && aptDetail.active) || false
            })(<Switch />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Store Id">
            {getFieldDecorator('store_id', {
              rules: [
                { required: true, message: 'Enter Store Id' },
                {
                  max: 16,
                  message: 'Store Id length is limited to 16 characters'
                }
              ],
              initialValue: (aptDetail && aptDetail.store_id) || ''
            })(<Input placeholder="Enter Store Id" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Cost Centre">
            {getFieldDecorator('cost_center', {
              rules: [
                { required: true, message: 'Enter Cost Centre' },
                {
                  max: 16,
                  message: 'Cost Centre length is limited to 16 characters'
                }
              ],
              initialValue: (aptDetail && aptDetail.cost_center) || ''
            })(<Input placeholder="Enter Cost Centre" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Opening Date">
            {getFieldDecorator('opening_date', {
              rules: [
                {
                  required: true,
                  message: 'Select store opening date'
                }
              ],
              initialValue: aptDetail
                ? moment(aptDetail.opening_date)
                : moment(moment().locale('en'))
            })(<DatePicker format="MM-DD-YYYY" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Select Zone">
            {getFieldDecorator('zone_id', {
              rules: [{ required: true, message: 'Select Zone' }],
              initialValue: (aptDetail && aptDetail.zone_id) || ''
            })(
              <Select
                onChange={zone_id =>
                  props.pm.handleZoneChange(zone_id, props.form)
                }
                showSearch
                placeholder="Select Zone"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.zoneList.map(row => (
                  <Option key={row.zone_id} value={row.zone_id}>
                    {row.zone_name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Select City">
            {getFieldDecorator('city_id', {
              rules: [{ required: true, message: 'Select City' }],
              initialValue: (aptDetail && aptDetail.city_id) || ''
            })(
              <Select
                showSearch
                placeholder="Select City"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {props.filterCityList.map(row => (
                  <Option key={row.city_id} value={row.city_id}>
                    {row.city_name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Customer email">
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'Please enter proper email'
                }
              ],
              initialValue: (aptDetail && aptDetail.email) || ''
            })(<Input placeholder="Enter customer email" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="Customer Phone No">
            {getFieldDecorator('phone', {
              rules: [
                {
                  min: 8,
                  max: 10
                }
              ],
              initialValue: (aptDetail && aptDetail.phone) || ''
            })(<Input type="number" placeholder="Customer Phone No" />)}
          </FormItem>
          {aptDetail ? (
            <div>
              <FormItem {...formItemLayout} label="Tablet Id">
                {getFieldDecorator('tablet_email', {
                  initialValue: (aptDetail && aptDetail.tablet_email) || ''
                })(
                  <Input
                    readOnly={true}
                    className="input-UI-Decoration"
                    placeholder="Tablet Id"
                  />
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Tablet Password">
                {getFieldDecorator('password', {
                  initialValue: (aptDetail && aptDetail.password) || ''
                })(
                  <Input
                    readOnly={true}
                    className="input-UI-Decoration"
                    placeholder="Password"
                  />
                )}
              </FormItem>
            </div>
          ) : null}
          <FormItem {...formItemLayout}>
            <div className="back-save-btn">
              <Button onClick={() => props.history.goBack()} type="primary">
                <Icon type="left" />
                Go back
              </Button>
              <Button
                type="primary"
                className="submitButton"
                htmlType="submit"
                loading={props.btnLoading}
              >
                Save
              </Button>
            </div>
          </FormItem>
        </Form>
      </ContainerLayout>
    </div>
  )
}

export default presenter(
  store => ({
    zoneList: store.zone.zonelist,
    cityList: store.city.citylist,
    customerList: store.customer.customerlist,
    filterCityList: store.storeLocation.filterCityList,
    lastCustomer: store.mainHeader.lastCustomer
  }),
  {
    ...storeLocationsActions,
    ...customerActions,
    ...cityActions,
    ...zoneActions,
    ...mainHeaderActions
  }
)(OutletInformationPm, Form.create()(OutletInformation))
