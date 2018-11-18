import React from 'react'
import presenter from 'hoc/presenter'
import ModelsPM from './modelsPM'
import ContainerHeader from 'components/ContainerHeader'
import { Button, Tooltip, Form } from 'antd'
import TableContainer from 'components/TableContainer'
import ContainerLayout from 'components/ContainerLayout'
import * as modelActions from 'actions/model'
import * as equipmentActions from 'actions/equipments'
import * as brandActions from 'actions/brands'
import AddEditModal from './addEditModal'
import columns from './columns'
import { sortModelList } from 'selectors/models'
import './models.scss'

const Models = props => {
  return (
    <div className="model-container">
      <ContainerHeader
        title="Models"
        extra={
          <Tooltip placement="bottom" title="Add new Models">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => props.pm.showModal(null)}
            />
          </Tooltip>
        }
      />
      <ContainerLayout>
        <AddEditModal {...props} />
        <TableContainer
          filterByFields={[
            'model_name',
            'eq_name',
            'brand_name',
            'date_created'
          ]}
          tableProps={{
            dataSource: props.modellist,
            columns: columns(props.pm),
            rowKey: record => record.model_id,
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

export default Form.create()(
  presenter(
    store => ({
      modellist: sortModelList(store.model.modellist),
      equipmentList: store.equipments.equipmentsList,
      brandslist: store.brands.brandslist,
      visible: store.model.visible,
      record: store.model.record,
      isFetching: store.model.isFetching,
      selectedValue: store.model.selectedValue
    }),
    { ...modelActions, ...equipmentActions, ...brandActions }
  )(ModelsPM, Models)
)
