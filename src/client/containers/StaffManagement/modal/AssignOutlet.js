import React from 'react'
import { Tabs } from 'antd'
import TableContainer from 'components/TableContainer'
import zoneColumns from './zoneColumns'
import outletsColumns from './outletsColumns'
import CityOutlet from './CityOutlet'

const TabPane = Tabs.TabPane
const AssignOutlet = props => {
  const {
    zonelist,
    pm,
    outlets,
    selectedZonelist,
    selectedOutletlist,
    activeOutletTab,
    roleType
  } = props
  const allOutletList = outlets.outletsData.apartments
  const cityAndAllOutletTabDisabled = roleType === 'reg_manager'
  const rowSelection = type => {
    return {
      selectedRowKeys: type === 'zone' ? selectedZonelist : selectedOutletlist,
      onChange: selKeys => pm.zoneOrOutletListChange(type, selKeys)
    }
  }
  return (
    <div>
      <Tabs
        activeKey={activeOutletTab}
        tabPosition="left"
        onChange={pm.onOutletTabChange}
      >
        <TabPane tab="Zonewise Outlets" key="zonewise-outlets">
          <TableContainer
            tableProps={{
              dataSource: zonelist,
              rowSelection: rowSelection('zone'),
              columns: zoneColumns(pm),
              rowKey: record => record.zone_id,
              pagination: {
                size: 'small',
                showSizeChanger: true,
                showQuickJumper: true
              },
              scroll: { y: 400 }
            }}
          />
        </TabPane>
        <TabPane
          tab="Citywise Outlets"
          key="citywise-outlets"
          disabled={cityAndAllOutletTabDisabled}
        >
          <CityOutlet {...props} />
        </TabPane>
        <TabPane
          tab="All Outlets"
          key="all-outlets"
          disabled={cityAndAllOutletTabDisabled}
        >
          <TableContainer
            tableProps={{
              dataSource: allOutletList,
              rowSelection: rowSelection(),
              columns: outletsColumns(pm),
              rowKey: record => record.apt_id,
              pagination: {
                size: 'small',
                showSizeChanger: true,
                showQuickJumper: true,
                defaultCurrent: 1
              },
              scroll: { y: 400 }
            }}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default AssignOutlet
