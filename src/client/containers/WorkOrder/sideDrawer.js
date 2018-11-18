import React from 'react'
import { Drawer, Icon, Tabs } from 'antd'
import WorkOrderDetails from './workOrderDetails'
import Comments from './comments'
const TabPane = Tabs.TabPane

const SideDrawer = props => {
  return (
    <Drawer
      title={<Icon onClick={props.pm.onDrawerClose} type="left" />}
      placement="right"
      closable={false}
      width={600}
      onClose={props.pm.onDrawerClose}
      visible={props.visible}
    >
      <Tabs activeKey={props.activeKey} onChange={props.changeTabActiveKey}>
        <TabPane tab="Details" key="1">
          <WorkOrderDetails {...props} />
        </TabPane>
        <TabPane tab="Comments" key="2">
          <Comments {...props} />
        </TabPane>
      </Tabs>
    </Drawer>
  )
}

export default SideDrawer
