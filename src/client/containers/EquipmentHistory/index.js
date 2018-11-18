import React from 'react'
import presenter from 'hoc/presenter'
import EquipmentHistoryPM from './EquipmentHistoryPM'
import ContainerLayout from 'components/ContainerLayout'
import ContainerHeader from 'components/ContainerHeader'
import * as equipmentHistoryActions from 'actions/equipmentHistory'
import TableContainer from 'components/TableContainer'
import columns from './columns'
import './equipmentHistory.scss'
import { Button, Icon } from 'antd'
const EquipmentHistory = props => {
  let eqName = JSON.parse(localStorage.getItem('selectEquipmentHistory')).sr_no
  return (
    <div className="equipment-history">
      <ContainerHeader title={`Equipment History: ${eqName}`} />
      <ContainerLayout>
        <TableContainer
          filterByFields={[
            'apt_name',
            'eq_name',
            'brand_name',
            'model_name',
            'sr_no'
          ]}
          tableProps={{
            dataSource: props.equipmentHistoryList,
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
    equipmentHistoryList: store.equipmentHistory.equipmentHistoryList,
    isFetching: store.equipmentHistory.isFetching
  }),
  { ...equipmentHistoryActions }
)(EquipmentHistoryPM, EquipmentHistory)
