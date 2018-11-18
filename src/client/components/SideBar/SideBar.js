import React from 'react'
import { Menu, Icon, Layout } from 'antd'
import { Link } from 'react-router-dom'
import presenter from 'hoc/presenter'
import SideBarPM from './SideBarPM'
import SidebarContent from './SidebarContent'
import { Tooltip, Badge } from 'antd'
import * as Actions from 'actions/sidebar'
import * as socketActions from 'actions/socket'
import { withRouter } from 'react-router-dom'
import { activeKeys } from 'selectors/sidebar'
import { getLocalStorageData } from 'utils/localStorage'
import './index.scss'

const { Sider } = Layout
const SubMenu = Menu.SubMenu

const SideBar = props => {
  const { role_name } = getLocalStorageData(['role_name'])
  return (
    <Sider
      collapsible
      width={250}
      collapsed={props.collapse}
      onCollapse={props.pm.onCollapse}
    >
      <div className="logo" />
      <Tooltip placement="top" title="Whats New">
        <div
          className="align-version"
          onClick={() => props.history.push('/whatsNew')}
        >
          <span>{props.version}</span>
        </div>
      </Tooltip>

      <Menu mode="inline" selectedKeys={props.activeKeys}>
        {SidebarContent.map(content => {
          const toShow = content.role.includes(role_name)
          if (content.children.length && toShow) {
            return (
              <SubMenu
                key={content.key}
                title={
                  <span>
                    <Icon type={content.icon} className="sidebar-icon" />
                    <span>{content.name}</span>
                  </span>
                }
              >
                {content.children.map(child => {
                  const toShowChild = child.role.includes(role_name)
                  if (toShowChild) {
                    return (
                      <Menu.Item key={child.key}>
                        <Link to={child.route}>
                          <Icon type={child.icon} className="sidebar-icon" />
                          <span>{child.name}</span>
                        </Link>
                      </Menu.Item>
                    )
                  } else {
                    return null
                  }
                })}
              </SubMenu>
            )
          } else {
            if (toShow) {
              return (
                <Menu.Item key={content.key}>
                  <Link to={content.route}>
                    <Icon type={content.icon} className="sidebar-icon" />
                    <span>
                      {content.name}
                      {content.key == 12 &&
                        props.workOrderCount > 0 && (
                          <Badge className="left-margin" count="New" />
                        )}
                      {content.key == 14 &&
                        props.count.size !== 0 && (
                          <Badge className="left-margin" count={1} />
                        )}
                    </span>
                  </Link>
                </Menu.Item>
              )
            } else {
              return null
            }
          }
        })}
      </Menu>
    </Sider>
  )
}

export default withRouter(
  presenter(
    (store, ownProps) => ({
      collapse: store.sidebar.collapse,
      version: store.releaseNote.version,
      workOrderCount: store.workorder.workOrderCount,
      activeKeys: activeKeys(ownProps, SidebarContent),
      count: store.socket.count
    }),
    {
      ...Actions,
      ...socketActions
    }
  )(SideBarPM, SideBar)
)
