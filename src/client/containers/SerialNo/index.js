import React from 'react'
import presenter from 'hoc/presenter'
import SerialNoPM from './SerialNoPM'
import ContainerHeader from 'components/ContainerHeader'
import { Button, Tooltip, Form, Input } from 'antd'
import { getFilteredValues, getWarrantyMonths } from 'selectors/serialNo'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import * as serialNoActions from 'actions/serialNo'
import * as equipmentNoActions from 'actions/equipments'
import * as brandNoActions from 'actions/brands'
import * as modelNoActions from 'actions/model'
import { withRouter } from 'react-router-dom'
import columns from './columns'
import SerialNoModal from './SerialNoModal'
import './SerialNo.scss'

const Search = Input.Search

const SerialNo = props => {
  return (
    <div className="serial-no">
      <SerialNoModal {...props} />
      <ContainerHeader
        title="Serial No"
        extra={
          <Tooltip placement="bottom" title="Add new Serial No.">
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
          filterByFields={[]}
          tableProps={{
            dataSource: props.serialNoData,
            columns: columns(props.pm),
            rowKey: record => record.id,
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
                onChange={props.pm.onSearchSerialNo}
                key={1}
                id="input-search"
              />
            </div>
          }
        />
      </ContainerLayout>
    </div>
  )
}

export default withRouter(
  Form.create()(
    presenter(
      store => ({
        serialNolist: store.serialNo.serialNolist,
        serialNoData: store.serialNo.serialNoData,
        tableSettings: store.serialNo.tableSettings,
        visible: store.serialNo.visible,
        record: store.serialNo.record,
        keys: store.serialNo.keys,
        totalSerialNos: store.serialNo.totalSerialNos,
        equipmentsList: store.equipments.equipmentsList,
        modellist: store.model.modellist,
        brandslist: store.brands.brandslist,
        brandFilteredValues: getFilteredValues(store, 'brands'),
        modelFilteredValues: getFilteredValues(store, 'model'),
        warrantyMonths: getWarrantyMonths(),
        isFetching: store.serialNo.isFetching
      }),
      {
        ...serialNoActions,
        ...equipmentNoActions,
        ...brandNoActions,
        ...modelNoActions
      }
    )(SerialNoPM, SerialNo)
  )
)
