import React from 'react'
import presenter from 'hoc/presenter'
import mainHeaderPM from './mainHeaderPM'
import { Layout, Select, Avatar, Popover, Icon, Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import { getLocalStorageData } from 'utils/localStorage'
import * as customerActions from 'actions/customer'
import * as mainHeaderActions from 'actions/mainHeader'
import * as dashboardActions from 'actions/dashboard'
import * as workorderActions from 'actions/workorder'
import * as storeLocationsActions from 'actions/storeLocations'
import * as reportActions from 'actions/report'
import imagePlacer from 'assets/images/imagePlacer.jpg'
import './mainHeader.scss'
const { Header } = Layout
const Option = Select.Option
const content = props => {
  return (
    <div className="main-header-content-menu">
      <Menu>
        <Menu.Item
          key="18"
          className="popover-text"
          onClick={props.pm.setProfile}
        >
          <Icon type="user" />
          <span>Profile</span>
        </Menu.Item>
        <Menu.Item
          key="19"
          className="popover-text"
          onClick={props.pm.onChangePassword}
        >
          <Icon type="key" />
          <span>Change Password</span>
        </Menu.Item>
        <Menu.Item key="20" className="popover-text" onClick={props.pm.logout}>
          <Icon type="logout" />
          <span>Logout</span>
        </Menu.Item>
      </Menu>
    </div>
  )
}
const MainHeader = props => {
  const data = getLocalStorageData(['user_name', 'city', 'last_customer'])
  return (
    <Header className="main-header">
      <div className="align-content">
        <div className="color-white">{`Welcome, ${data.user_name} (${
          data.city
        })`}</div>
        <div className="align-dropdown">
          <span className="customer-title">Customer:</span>
          <Select
            className="dropdown-style"
            optionFilterProp="children"
            value={props.lastCustomer}
            onChange={props.pm.handleChange}
          >
            <Option value={0} key={0}>
              <Avatar
                className="margin-right-5"
                shape="square"
                size="small"
                src={imagePlacer}
              />{' '}
              All
            </Option>
            {props.customerlist.map(customer => {
              return (
                <Option value={customer.customer_id} key={customer.customer_id}>
                  <Avatar
                    className="margin-right-5"
                    shape="square"
                    size="small"
                    src={
                      customer.thumb_url && customer.thumb_url.length > 0
                        ? customer.thumb_url
                        : imagePlacer
                    }
                  />{' '}
                  {customer.customer_name}
                </Option>
              )
            })}
          </Select>
          <div className="align-account-logo">
            <Popover
              placement="bottomRight"
              className="popover-style"
              content={content(props)}
              trigger="hover"
            >
              <Icon type="user" />
              <span className="caret" />
            </Popover>
          </div>
        </div>
      </div>
    </Header>
  )
}

export default withRouter(
  presenter(
    store => ({
      customerlist: store.customer.customerlist,
      lastCustomer: store.mainHeader.lastCustomer
    }),
    {
      ...customerActions,
      ...mainHeaderActions,
      ...dashboardActions,
      ...workorderActions,
      ...storeLocationsActions,
      ...reportActions
    }
  )(mainHeaderPM, MainHeader)
)
