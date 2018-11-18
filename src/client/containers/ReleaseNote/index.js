import React from 'react'
import presenter from 'hoc/presenter'
import ReleaseNotePM from './releaseNotePM'
import ContainerHeader from 'components/ContainerHeader/index'
import { Button, Tooltip } from 'antd'
import TableContainer from 'components/TableContainer'
import ContainerLayout from 'components/ContainerLayout'
import * as releaseNoteListActions from 'actions/releaseNote'
import columns from './columns'
import ReleaseNoteModal from './releaseNoteModal'
import { sortReleaseNotes } from 'selectors/releaseNote'

const ReleaseNote = props => {
  return (
    <div>
      <ContainerHeader
        title="RELEASE NOTE"
        extra={
          <Tooltip placement="bottom" title="Add new release note">
            <Button
              className="commonAddButton"
              type="primary"
              shape="circle"
              icon="plus"
              onClick={() => props.pm.onAddEditModal('add', null)}
            />
          </Tooltip>
        }
      />
      <ReleaseNoteModal {...props} />
      <ContainerLayout>
        <TableContainer
          tableProps={{
            columns: columns(props, props.pm.on),
            dataSource: props.releaseNoteList,
            rowKey: record => record.id,
            pagination: {
              position: 'both',
              defaultPageSize: 20,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
            }
          }}
          filterByFields={['title', 'version', 'release_date', 'status']}
        />
      </ContainerLayout>
    </div>
  )
}

export default presenter(
  store => ({
    releaseNoteList: sortReleaseNotes(store.releaseNote.releaseNoteList),
    isFetching: store.releaseNote.isFetching,
    visible: store.releaseNote.visible,
    description: store.releaseNote.description,
    record: store.releaseNote.record
  }),
  releaseNoteListActions
)(ReleaseNotePM, ReleaseNote)
