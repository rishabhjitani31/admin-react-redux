import React from 'react'
import ContainerHeader from 'components/ContainerHeader/index'
import { Button, Tooltip, Icon } from 'antd'
import TableContainer from 'components/TableContainer'
import ContainerLayout from 'components/ContainerLayout'
import columns from './columns'
import * as storeLocationsActions from 'actions/storeLocations'
import * as equipmentsActions from 'actions/equipments'
import * as brandsActions from 'actions/brands'
import * as modelActions from 'actions/model'
import presenter from 'hoc/presenter'
import EquipmentsPm from './equipmentsPM'
import './index.scss'
import EquipmentModal from './equipmentModal'
const Equipments = props => {
  return (
    <div className="equipment-container">
      <EquipmentModal {...props} />
      <ContainerHeader
        title={`EQUIPMENTS LIST OF OUTLET : ${JSON.parse(
          localStorage.getItem('selectEquipment')
        ).apt_name || ''}`}
        extra={
          <Tooltip placement="bottom" title="Add Equipment Data">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => props.pm.handleEquipmentModal()}
            />
          </Tooltip>
        }
      />
      <ContainerLayout>
        <TableContainer
          filterByFields={['eq_name', 'brand_name', 'model_name', 'sr_no']}
          tableProps={{
            dataSource: props.equipmentsData,
            columns: columns(props.pm),
            rowKey: (record, i) => i,
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
        <Button
          className="go-back"
          onClick={() => props.history.goBack()}
          type="primary"
        >
          <Icon type="left" />
          Go back
        </Button>
      </ContainerLayout>
    </div>
  )
}
export default presenter(
  store => ({
    equipmentsData: store.storeLocation.equipmentsData,
    isFetching: store.storeLocation.isFetching,
    visible: store.storeLocation.visible,
    record: store.storeLocation.record,
    equipmentForm: store.storeLocation.equipmentForm,
    equipmentsList: store.equipments.equipmentsList,
    brandslist: store.brands.brandslist,
    modellist: store.model.modellist
  }),
  {
    ...storeLocationsActions,
    ...equipmentsActions,
    ...brandsActions,
    ...modelActions
  }
)(EquipmentsPm, Equipments)
