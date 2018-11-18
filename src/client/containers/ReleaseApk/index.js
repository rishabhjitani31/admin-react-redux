import React from 'react'
import presenter from 'hoc/presenter'
import ReleaseApkPM from './releaseApkPM'
import ContainerHeader from 'components/ContainerHeader'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import ReleaseApkModal from './releaseApkModal'
import * as Actions from 'actions/releaseApk'
import columns from './columns'
import { Button, Tooltip } from 'antd'
import './releaseApk.scss'

const ReleaseApk = props => {
  return (
    <div className="releaseApk">
      <ReleaseApkModal {...props} />
      <ContainerHeader
        title="Release Apk"
        extra={
          <Tooltip placement="bottom" title="Add new Release Apk">
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
          filterByFields={[
            'package_name',
            'version_number',
            'build_version',
            'details',
            'download_priority',
            'download_count'
          ]}
          tableProps={{
            dataSource: props.releaseApkList,
            columns: columns(props.pm),
            rowKey: record => record.id,
            loading: props.isFetching,
            pagination: {
              position: 'both',
              defaultPageSize: 20,
              total: props.releaseApkList.length,
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
    isFetching: store.releaseApk.isFetching,
    releaseApkList: store.releaseApk.releaseApkList,
    visible: store.releaseApk.visible,
    record: store.releaseApk.record,
    showForm: store.releaseApk.showForm,
    apkData: store.releaseApk.apkData,
    apkURL: store.releaseApk.apkURL,
    isUploading: store.releaseApk.isUploading,
    fileList: store.releaseApk.fileList
  }),
  Actions
)(ReleaseApkPM, ReleaseApk)
