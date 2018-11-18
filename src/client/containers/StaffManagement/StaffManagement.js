import React from 'react'
import presenter from 'hoc/presenter'
import StaffManagementPM from './StaffManagementPM'
import ContainerHeader from 'components/ContainerHeader/index'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import { Button, Tooltip, Tabs } from 'antd'
import * as staffActions from 'actions/staffManagement'
import * as zoneActions from 'actions/zone'
import * as cityActions from 'actions/city'
import * as storeActions from 'actions/storeLocations'
import columns from './columns'
import pendingColumns from './pendingColumns'
import StaffModal from './modal/StaffModal'
import VerifyInvitation from './modal/VerifyInvitation'
import { getFilteredValues, mappedStaffList } from 'selectors/staffManagement'
import './StaffManagement.scss'

const TabPane = Tabs.TabPane

const StaffManagement = props => {
  const tabData = [
    {
      tabTitle: 'All Staff',
      columns: columns,
      tabDataSource: props.staffs ? mappedStaffList(props.staffs.rows) : []
    },
    {
      tabTitle: 'Master',
      columns: columns,
      tabDataSource: props.staffs
        ? mappedStaffList(props.staffs.staff.master)
        : []
    },
    {
      tabTitle: 'Manager',
      columns: columns,
      tabDataSource: props.staffs
        ? mappedStaffList(props.staffs.staff.manager)
        : []
    },
    {
      tabTitle: 'Regional Manager',
      columns: columns,
      tabDataSource: props.staffs
        ? mappedStaffList(props.staffs.staff.reg_manager)
        : []
    },
    {
      tabTitle: 'Technician',
      columns: columns,
      tabDataSource: props.staffs
        ? mappedStaffList(props.staffs.staff.technician)
        : []
    },
    {
      tabTitle: 'Project',
      columns: columns,
      tabDataSource: props.staffs
        ? mappedStaffList(props.staffs.staff.project)
        : []
    },
    {
      tabTitle: 'Pending Staff',
      columns: pendingColumns,
      tabDataSource: props.staffs
        ? mappedStaffList(props.staffs.pendingRows)
        : []
    }
  ]
  return (
    <div className="staff">
      <StaffModal {...props} />
      <VerifyInvitation {...props} />
      <ContainerHeader
        title="Staff Management"
        extra={
          <Tooltip placement="bottom" title="Add new Staff">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => props.pm.showEditPopup(null)}
            />
          </Tooltip>
        }
      />
      <ContainerLayout>
        <Tabs>
          {tabData.map((data, i) => (
            <TabPane tab={data.tabTitle} key={i}>
              <TableContainer
                filterByFields={['full_name', 'email', 'phone', 'role']}
                tableProps={{
                  dataSource: data.tabDataSource,
                  columns: data.columns(props.pm),
                  rowKey: (record, index) => index,
                  loading: props.isFetching,
                  pagination: {
                    position: 'both',
                    defaultPageSize: 20,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total} items`
                  }
                }}
              />
            </TabPane>
          ))}
        </Tabs>
      </ContainerLayout>
    </div>
  )
}

export default presenter(
  store => ({
    staffs: store.staff.staffs,
    isFetching: store.staff.isFetching,
    visible: store.staff.visible,
    roleType: store.staff.roleType,
    record: store.staff.record,
    zonelist: store.zone.zonelist,
    outlets: store.storeLocation.outlets,
    selectedZonelist: store.zone.selectedZones,
    selectedOutletlist: store.storeLocation.selectedOutletlist,
    selectedCityList: store.staff.selectedCityList,
    activeStaffTab: store.staff.activeStaffTab,
    activeOutletTab: store.staff.activeOutletTab,
    verifyInvitation: store.staff.toogleVerifyInvitation,
    keys: store.staff.keys,
    totalCityOutlets: store.staff.totalCityOutlets,
    cityList: store.city.citylist,
    cityFilteredValues: getFilteredValues(store),
    selectedCities: store.staff.selectedCities,
    allCityData: store.staff.allCityData,
    selectedZone: store.staff.zone_id
  }),
  { ...staffActions, ...zoneActions, ...storeActions, ...cityActions }
)(StaffManagementPM, StaffManagement)
