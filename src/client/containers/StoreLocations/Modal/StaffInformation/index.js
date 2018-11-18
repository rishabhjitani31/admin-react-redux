import React from 'react'
import ContainerHeader from 'components/ContainerHeader/index'
import { Button, Tooltip, Icon } from 'antd'
import TableContainer from 'components/TableContainer'
import ContainerLayout from 'components/ContainerLayout'
import columns from './columns'
import * as Actions from 'actions/storeLocations'
import presenter from 'hoc/presenter'
import StaffInformationPM from './staffInformationPM'

const StaffInformation = props => {
  return (
    <div>
      <ContainerHeader
        title={`STAFF INFORMATION FOR OUTLET  : ${JSON.parse(
          localStorage.getItem('selectSatffInformation')
        ).apt_name || ''}`}
        extra={
          <Tooltip placement="bottom" title="Add new Customer">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => props.pm.showPopup(null)}
            />
          </Tooltip>
        }
      />
      <ContainerLayout>
        <TableContainer
          filterByFields={['first_name', 'email', 'phone', 'user_role']}
          tableProps={{
            dataSource: props.satffInformationLists,
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
        <Button onClick={() => props.history.goBack()} type="primary">
          <Icon type="left" />
          Go back
        </Button>
      </ContainerLayout>
    </div>
  )
}
export default presenter(
  store => ({
    satffInformationLists: store.storeLocation.satffInformationLists,
    isFetching: store.storeLocation.isFetching
  }),
  Actions
)(StaffInformationPM, StaffInformation)
