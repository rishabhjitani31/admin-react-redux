import React from 'react'
import presenter from 'hoc/presenter'
import TabletStatusPM from './tabletStatusPM'
import ContainerHeader from 'components/ContainerHeader'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import { Button, Tooltip } from 'antd'
import * as Actions from 'actions/tabletStatus'
import columns from './columns'
import { mappedTabletStatus } from 'selectors/tabletStatus'
import './tabletStatus.scss'
const TabletStatus = props => {
  return (
    <div className="tablet-container">
      <ContainerHeader
        title="Tablet Status"
        extra={
          <Tooltip placement="bottom" title="Refresh all Tablet Status">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="reload"
              onClick={() => {
                props.pm.refreshAllRecordsTabletStatus()
              }}
            />
          </Tooltip>
        }
      />
      <ContainerLayout>
        <TableContainer
          filterByFields={[
            'apt_name',
            'app_version',
            'email',
            'mac_address',
            'ts',
            'new_battery_level'
          ]}
          tableProps={{
            dataSource: props.tabletStatuslist,
            columns: columns(props.pm),
            rowKey: record => record.apt_id,
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
    tabletStatuslist: mappedTabletStatus(store.tabletStatus.tabletStatuslist),
    visible: store.tabletStatus.visible,
    record: store.tabletStatus.record
  }),
  Actions
)(TabletStatusPM, TabletStatus)
