import React from 'react'
import { Form, Select, DatePicker, Button } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const { RangePicker } = DatePicker
const dateFormat = 'YYYY/MM/DD'

const Extras = props => {
  const { getFieldDecorator } = props.form
  return (
    <Form
      layout="inline"
      className="form-style"
      onSubmit={e => props.pm.filterReports(e, props.form)}
    >
      <FormItem>
        {getFieldDecorator('customer_id', {
          initialValue:
            props.lastCustomer && props.customerlist.length > 0
              ? props.lastCustomer
              : undefined
        })(
          <Select
            showSearch
            className="select-width"
            placeholder="Select Customer"
          >
            {props.customerlist.map(row => (
              <Option key={row.customer_id} value={row.customer_id}>
                {row.customer_name}
              </Option>
            ))}
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('zone_id', {})(
          <Select
            className="select-width"
            placeholder="Select Zone"
            onChange={e => props.pm.onZoneChange(e, props.form)}
          >
            {props.allZoneList.map(zone => {
              return (
                <Option value={zone.zone_id} key={zone.zone_id}>
                  {zone.zone_name}
                </Option>
              )
            })}
          </Select>
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('city_id', {})(
          <Select
            className="select-width"
            placeholder="Select City"
            onChange={e => props.pm.onCityChange(e, props.form)}
          >
            {props.filteredCityList.map(city => {
              return (
                <Option value={city.city_id} key={city.city_id}>
                  {city.city_name}
                </Option>
              )
            })}
          </Select>
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('apt_id', {})(
          <Select className="select-width" placeholder="Select Location">
            {props.filteredLocationList.map(location => {
              return (
                <Option value={location.apt_id} key={location.apt_id}>
                  {location.apt_name}
                </Option>
              )
            })}
          </Select>
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('staff_id', {})(
          <Select className="select-width" placeholder="Select Staff">
            {props.allStaffList.map(staff => {
              return (
                <Option value={staff.staff_id} key={staff.staff_id}>
                  {`${staff.first_name} ${staff.last_name}`}
                </Option>
              )
            })}
          </Select>
        )}
      </FormItem>

      <FormItem>
        {getFieldDecorator('date', {})(<RangePicker format={dateFormat} />)}
      </FormItem>

      <FormItem>
        <Button type="primary" htmlType="submit">
          Apply
        </Button>
      </FormItem>
      <FormItem>
        <Button type="primary" onClick={() => props.form.resetFields()}>
          Clear
        </Button>
      </FormItem>
    </Form>
  )
}

export default Form.create()(Extras)
