import React from 'react'
import presenter from 'hoc/presenter'
import EquipmentsPM from './equipmentsPM'
import ContainerHeader from 'components/ContainerHeader/index'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import { Button, Tooltip } from 'antd'
import * as Actions from 'actions/equipments'
import Columns from './Columns'
import HandleEquipmentsModal from 'containers/Equipments/modals/handleEquipmentsModal/HandleEquipmentsModal'
import AddNewIssueModal from 'containers/Equipments/modals/addIssues/AddIssues'
import './Equipments.scss'
import { sortDefaultIssuesList } from 'selectors/equipments'

const Equipments = props => {
  return (
    <div className="equipments-container">
      <ContainerHeader
        title="Equipments"
        extra={
          <Tooltip placement="bottom" title="Add new Equipments">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => props.toggleEquipmentToggleModal('add')}
            />
          </Tooltip>
        }
      />
      <ContainerLayout>
        <TableContainer
          filterByFields={['eq_name']}
          tableProps={{
            dataSource: props.equipmentsList.length ? props.equipmentsList : [],
            columns: Columns(props),
            rowKey: data => data.eq_id,
            pagination: {
              position: 'both',
              defaultPageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
            },
            loading: props.isEquipmentsLoading
          }}
        />
      </ContainerLayout>
      <HandleEquipmentsModal {...props} />
      <AddNewIssueModal {...props} />
    </div>
  )
}

export default presenter(
  store => ({
    equipmentsList: store.equipments.equipmentsList,
    isHandleEquipmentsModalOpen: store.equipments.isHandleEquipmentsModalOpen,
    equipmentsHandleModalUsage: store.equipments.equipmentsHandleModalUsage,
    selectedImageToUpload: store.equipments.selectedImageToUpload,
    fileList: store.equipments.fileList,
    isAddIssueModalOpen: store.equipments.isAddIssueModalOpen,
    defaultIssuesList: sortDefaultIssuesList(
      store.equipments.defaultIssuesList
    ),
    selectedRowKeys: store.equipments.selectedRowKeys,
    selectedAddIssueData: store.equipments.selectedAddIssueData,
    addUpdateIssueTitle: store.equipments.addUpdateIssueTitle,
    isAddUpdateIssueFormVisible: store.equipments.isAddUpdateIssueFormVisible,
    editIssuesKey: store.equipments.editIssuesKey,
    selectedIssueRowData: store.equipments.selectedIssueRowData,
    selectedIssueRowIndex: store.equipments.selectedIssueRowIndex,
    issueEditVal: store.equipments.issueEditVal,
    selectedEquipment: store.equipments.selectedEquipment,
    visible: store.equipments.visible,
    isRemovingImage: store.equipments.isRemovingImage,
    isEquipmentsLoading: store.equipments.isEquipmentsLoading,
    isLoadingIssuesList: store.equipments.isLoadingIssuesList
  }),
  Actions
)(EquipmentsPM, Equipments)
