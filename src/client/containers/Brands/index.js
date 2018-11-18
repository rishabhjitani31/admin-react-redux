import React from 'react'
import presenter from 'hoc/presenter'
import BrandsPM from './brandsPM'
import ContainerHeader from 'components/ContainerHeader'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import BrandsModal from './brandsModal'
import * as brandsActions from 'actions/brands'
import * as equipmentsActions from 'actions/equipments'
import columns from './columns'
import { Button, Tooltip } from 'antd'
import './brand.scss'
import { sortBrands } from 'selectors/brand'

const Brands = props => {
  return (
    <div className="brand">
      <BrandsModal {...props} />
      <ContainerHeader
        title="Brands"
        extra={
          <Tooltip placement="bottom" title="Add new Brand">
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
        <div>
          <TableContainer
            filterByFields={['brand_name', 'eq_name']}
            tableProps={{
              dataSource: props.brandslist,
              columns: columns(props.pm),
              rowKey: record => record.brand_id,
              loading: props.isFetching,
              pagination: {
                position: 'both',
                defaultPageSize: 20,
                total: props.brandslist.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
              }
            }}
          />
        </div>
      </ContainerLayout>
    </div>
  )
}
export default presenter(
  store => ({
    brandslist: sortBrands(store.brands.brandslist),
    equipmentsList: store.equipments.equipmentsList,
    visible: store.brands.visible,
    record: store.brands.record,
    isFetching: store.brands.isFetching,
    isBtnLoading: store.brands.isLoading,
    fileList: store.brands.fileList,
    image_urls: store.brands.image_urls,
    loading: store.brands.loading,
    removeImageData: store.brands.removeImageData
  }),
  { ...equipmentsActions, ...brandsActions }
)(BrandsPM, Brands)
