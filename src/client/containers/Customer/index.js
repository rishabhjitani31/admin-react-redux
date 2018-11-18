import React from 'react'
import presenter from 'hoc/presenter'
import CustomerPM from './customerPM'
import ContainerHeader from 'components/ContainerHeader'
import { Button, Tooltip } from 'antd'
import TableContainer from 'components/TableContainer'
import ContainerLayout from 'components/ContainerLayout'
import columns from './columns'
import * as Actions from 'actions/customer'
import CustomerModule from './customerModal'
import { sortCustomerList } from 'selectors/customer'
import './customer.scss'

const Customer = props => {
  return (
    <div className="customer-container">
      <CustomerModule {...props} />
      <ContainerHeader
        title="Customer"
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
          filterByFields={['customer_name', 'date_created']}
          tableProps={{
            dataSource: props.customerlist,
            columns: columns(props.pm),
            rowKey: record => record.customer_id,
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
    customerlist: sortCustomerList(store.customer.customerlist),
    visible: store.customer.visible,
    record: store.customer.record,
    fileList: store.customer.fileList,
    image_urls: store.customer.image_urls,
    loading: store.customer.loading,
    isFetching: store.customer.isFetching,
    isLoading: store.customer.isLoading,
    removeImageData: store.customer.removeImageData
  }),
  Actions
)(CustomerPM, Customer)
