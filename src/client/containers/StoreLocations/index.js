import React from 'react'
import presenter from 'hoc/presenter'
import StoreLocationsPM from './storeLocationsPM'
import ContainerHeader from 'components/ContainerHeader/index'
import { Button, Tooltip, Icon, Input } from 'antd'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import * as storeLocationsActions from 'actions/storeLocations'
import * as customerActions from 'actions/customer'
import * as cityActions from 'actions/city'
import * as zoneActions from 'actions/zone'
import columns from './columns'
import './index.scss'

const Search = Input.Search
const StoreLocations = props => {
  return (
    <div className="store-location-container">
      <ContainerHeader
        title="Store Locations"
        extra={
          <Tooltip placement="bottom" title="Add new Store Locations">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() =>
                props.history.push({
                  pathname: '/addLocation'
                })
              }
            />
          </Tooltip>
        }
      />
      <ContainerLayout>
        <TableContainer
          tableProps={{
            dataSource:
              props.storeLocationData && props.storeLocationData.result,
            columns: columns(props.pm),
            rowKey: record => record.apt_id,
            loading: props.isFetching,
            pagination: {
              position: 'both',
              defaultPageSize: 20,
              showSizeChanger: true,
              showQuickJumper: true,
              total: props.storeLocationData && props.storeLocationData.count,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
            },
            onChange: (pagination, filters, sorter) => {
              props.pm.onTrackFilter(pagination, filters, sorter)
            }
          }}
          extra={
            <div className="display-flex">
              <Search
                placeholder="Search"
                onChange={e => props.pm.onSearchApartments(e.target.value)}
                key={1}
              />
              <Button
                className="download-btn"
                onClick={props.pm.downloadLocations}
              >
                <Icon type="download" theme="outlined" /> Export Locations
              </Button>
            </div>
          }
        />
      </ContainerLayout>
    </div>
  )
}

export default presenter(
  store => ({
    storeLocationData: store.storeLocation.storeLocationData,
    isFetching: store.storeLocation.isFetching
  }),
  {
    ...storeLocationsActions,
    ...customerActions,
    ...cityActions,
    ...zoneActions
  }
)(StoreLocationsPM, StoreLocations)
