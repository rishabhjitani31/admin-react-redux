import React from 'react'
import presenter from 'hoc/presenter'
import CityPM from './cityPM'
import ContainerHeader from 'components/ContainerHeader'
import { Button, Tooltip } from 'antd'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import * as cityActions from 'actions/city'
import * as zoneActions from 'actions/zone'
import columns from './columns'
import CityModal from './cityModal'
import { sortCity } from 'selectors/city'
import './city.scss'

const City = props => {
  return (
    <div className="city">
      <CityModal {...props} />
      <ContainerHeader
        title="City"
        extra={
          <Tooltip placement="bottom" title="Add new City">
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
          filterByFields={['city_name', 'zone_name', 'date_created']}
          tableProps={{
            dataSource: props.citylist,
            columns: columns(props.pm),
            rowKey: record => record.city_id,
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
    citylist: sortCity(store.city.citylist),
    visible: store.city.visible,
    record: store.city.record,
    zonelist: store.zone.zonelist,
    isFetching: store.city.isFetching
  }),
  { ...cityActions, ...zoneActions }
)(CityPM, City)
