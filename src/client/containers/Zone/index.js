import React from 'react'
import presenter from 'hoc/presenter'
import ZonePM from './zonePM'
import ContainerHeader from 'components/ContainerHeader'
import { Button, Tooltip } from 'antd'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import * as Actions from 'actions/zone'
import columns from './columns'
import ZoneModal from './zoneModal'
import { sortZone } from 'selectors/zone'
import './zone.scss'

const Zone = props => {
  return (
    <div className="zone">
      <ZoneModal {...props} />
      <ContainerHeader
        title="Zone"
        extra={
          <Tooltip placement="bottom" title="Add new Zone">
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
        <TableContainer
          filterByFields={['zone_name', 'date_created', 'date_created']}
          tableProps={{
            dataSource: props.zonelist,
            columns: columns(props.pm),
            rowKey: record => record.zone_id,
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
      </ContainerLayout>
    </div>
  )
}

export default presenter(
  store => ({
    zonelist: sortZone(store.zone.zonelist),
    visible: store.zone.visible,
    record: store.zone.record,
    isFetching: store.zone.isFetching
  }),
  Actions
)(ZonePM, Zone)
