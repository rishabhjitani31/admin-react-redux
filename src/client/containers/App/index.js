import React from 'react'
import presenter from 'hoc/presenter'
import AppPM from './appPM'
import ContainerHeader from 'components/ContainerHeader'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import AppModal from './appModal'
import * as Actions from 'actions/app'
import columns from './columns'
import { Button, Tooltip } from 'antd'
import './app.scss'
import { formatArray } from 'selectors/app'

const App = props => {
  return (
    <div className="app">
      <AppModal {...props} />
      <ContainerHeader
        title="App"
        extra={
          <Tooltip placement="bottom" title="Add new App">
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
            filterByFields={['app_name', 'package_name', 'category_name']}
            tableProps={{
              dataSource: props.appList,
              columns: columns(props.pm),
              rowKey: record => record.app_id,
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
        </div>
      </ContainerLayout>
    </div>
  )
}
export default presenter(
  store => ({
    // appList: store.app.appList,
    appList: formatArray(store.app.appList),
    visible: store.app.visible,
    record: store.app.record,
    isFetching: store.app.isFetching,
    isBtnLoading: store.app.isLoading,
    fileList: store.app.fileList,
    image_urls: store.app.image_urls,
    loading: store.app.loading
  }),
  Actions
)(AppPM, App)
