import React from 'react'
import { Form, Button, Icon, Select, Collapse } from 'antd'
import './Modal.scss'

const Option = Select.Option
const Panel = Collapse.Panel
const FormItem = Form.Item

const CityOutlet = props => {
  let cityArray = []
  const { zonelist } = props
  return (
    <Form className="city-outlet">
      {props.keys.map((value, index) => {
        if (value.zone_id) {
          cityArray = props.cityList.filter(elem => {
            return elem.zone_id === parseInt(value.zone_id)
          })
        } else {
          cityArray = []
        }
        return (
          <Collapse key={index}>
            <Panel
              header="City Data"
              label={index === 0 ? 'City' : ''}
              required={false}
              key={index}
            >
              <FormItem label="Select Zone">
                {/* {getFieldDecorator(`zone_id[${value.key}]`, {
                  initialValue: parseInt(value.zone_id) || undefined
                  // (props.selectedCities &&
                  //   props.selectedCities[index] &&
                  //   props.selectedCities[index].zone_id) ||
                  // undefined
                })( */}
                <Select
                  className="sel-width "
                  placeholder="Select Zone"
                  onChange={zoneId =>
                    props.pm.onZoneListChange(value.key, zoneId)
                  }
                  value={value.zone_id}
                >
                  {zonelist.map(zone => (
                    <Option key={zone.zone_id} value={zone.zone_id}>
                      {zone.zone_name}
                    </Option>
                  ))}
                </Select>
                {/* )} */}
              </FormItem>
              <FormItem label="Select City">
                {/* {getFieldDecorator(`city_id[${value.key}]`, {})( */}
                <div className="align-city-remove-button">
                  <Select
                    className="sel-width "
                    placeholder="Select City"
                    mode="multiple"
                    value={[...value.city_ids] || []}
                    onSelect={cityId =>
                      props.pm.onCityOutletChange(value.key, cityId)
                    }
                    onDeselect={cityId =>
                      props.pm.onDeselect(value.key, cityId)
                    }
                  >
                    {cityArray.map(city => (
                      <Option key={city.city_id} value={city.city_id}>
                        {city.city_name}
                      </Option>
                    ))}
                  </Select>
                  {props.keys.length > 1 ? (
                    <Icon
                      className="dynamic-delete-button"
                      type="minus-circle-o"
                      disabled={props.keys.length === 1}
                      onClick={() => props.pm.removeItem(value.key)}
                    />
                  ) : null}
                </div>
                {/* )} */}
              </FormItem>
            </Panel>
          </Collapse>
        )
      })}
      <Button
        type="dashed"
        onClick={e => {
          props.onAddCityOutlet(props.totalCityOutlets, {
            zone_id: null,
            city_ids: []
          })
        }}
        className="add-city"
      >
        <Icon type="plus" /> Add City Outlet
      </Button>
    </Form>
  )
}

export default Form.create()(CityOutlet)
