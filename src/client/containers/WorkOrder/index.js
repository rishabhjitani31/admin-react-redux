import React from 'react'
import presenter from 'hoc/presenter'
import WorkOrderPM from './workOrderPM'
import ContainerHeader from 'components/ContainerHeader'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import { Button, Tooltip, Input } from 'antd'
import columns from './columns'
import WorkOrderModal from './Modal/workOrderModal'
import * as workorderActions from 'actions/workorder'
import * as customerActions from 'actions/customer'
import SideDrawer from './sideDrawer'
import './workorder.scss'

const Search = Input.Search
const WorkOrder = props => {
  return (
    <div className="workorder-layout">
      <ContainerHeader
        title="Work Order"
        extra={
          <Tooltip placement="bottom" title="Add new Work Order">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => props.pm.showPopup()}
            />
          </Tooltip>
        }
      />
      <WorkOrderModal {...props} />
      <ContainerLayout>
        <TableContainer
          filterByFields={[]}
          tableProps={{
            dataSource: props.workorderlist,
            columns: columns(),
            onRow: props.pm.onRowClick,
            rowKey: record => record.issue_id,
            loading: props.isFetching,
            pagination: props.tableSettings,
            onChange: (pagination, filters, sorter) => {
              props.pm.onTrackFilter(pagination, filters, sorter)
            }
          }}
          extra={
            <div className="display-flex">
              <Search
                placeholder="Search"
                onChange={props.pm.onSearchWorkOrder}
                key={1}
              />
              {props.workOrderCount > 0 && (
                <Tooltip
                  placement="bottomRight"
                  title="Mark all unread Tickets as read"
                  key={2}
                >
                  <Button
                    type="danger"
                    className="left-margin"
                    onClick={props.pm.markAllTicketRead}
                  >
                    Mark all read
                  </Button>
                </Tooltip>
              )}
            </div>
          }
        />
        <SideDrawer {...props} />
      </ContainerLayout>
    </div>
  )
}

export default presenter(
  store => ({
    isFetching: store.workorder.isFetching,
    workorderlist: store.workorder.workorderlist,
    visible: store.workorder.visible,
    orderDetail: store.workorder.orderDetail,
    modalVisibe: store.workorder.modalVisibe,
    customerlist: store.customer.customerlist,
    outletList: store.workorder.outletList,
    staffList: store.workorder.staffList,
    issuesList: store.workorder.issuesList,
    equipmentsList: store.workorder.equipmentsList,
    brandsList: store.workorder.brandsList,
    modelsList: store.workorder.modelsList,
    srnosList: store.workorder.srnosList,
    isBtnLoading: store.workorder.isLoading,
    fileList: store.workorder.fileList,
    image_urls: store.workorder.image_urls,
    loading: store.workorder.loading,
    changeTitle: store.workorder.changeTitle,
    newTitleId: store.workorder.newTitleId,
    newTitle: store.workorder.newTitle,
    isCommentFetching: store.workorder.isCommentFetching,
    commentValue: store.workorder.commentValue,
    changeCustomer: store.workorder.changeCustomer,
    newCustomerId: store.workorder.newCustomerId,
    changeOutlet: store.workorder.changeOutlet,
    newOutletId: store.workorder.newOutletId,
    changeEquipment: store.workorder.changeEquipment,
    newEquipment: store.workorder.newEquipment,
    newEquipmentId: store.workorder.newEquipmentId,
    changeBrand: store.workorder.changeBrand,
    newBrand: store.workorder.newBrand,
    newBrandId: store.workorder.newBrandId,
    changeModel: store.workorder.changeModel,
    newModel: store.workorder.newModel,
    newModelId: store.workorder.newModelId,
    changeSrno: store.workorder.changeSrno,
    newSrno: store.workorder.newSrno,
    newSrnoId: store.workorder.newSrnoId,
    changeAssignee: store.workorder.changeAssignee,
    newAssigneeId: store.workorder.newAssigneeId,
    manualsModalVisibe: store.workorder.manualsModalVisibe,
    reportDetail: store.workorder.reportDetail,
    reportModalVisible: store.workorder.reportModalVisible,
    serviceType: store.workorder.serviceType,
    partsReplaced: store.workorder.partsReplaced,
    showPartsInpuFields: store.workorder.showPartsInpuFields,
    description: store.workorder.description,
    partNo: store.workorder.partNo,
    quantity: store.workorder.quantity,
    tableSettings: store.workorder.tableSettings,
    workOrderCount: store.workorder.workOrderCount,
    activeKey: store.workorder.activeKey,
    uploading: store.workorder.uploading,
    isOrderFetching: store.workorder.isOrderFetching
  }),
  { ...workorderActions, ...customerActions }
)(WorkOrderPM, WorkOrder)
