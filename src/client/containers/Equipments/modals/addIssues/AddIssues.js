import React from 'react'
import { Modal, Button, Input } from 'antd'
import TableContainer from 'components/TableContainer'
import columns from './Columns'

import './addIssues.scss'

const AddNewIssueModal = props => {
  let addFormObj = {
    id: 'addForm',
    title: (
      <div>
        <Input onChange={e => props.pm.handleIssueTitleChange(e)} />
      </div>
    )
  }

  return (
    <Modal
      title="Issue List"
      width={800}
      visible={props.isAddIssueModalOpen}
      onCancel={props.toggleAddIssuesModal}
      className="handle-issues-container"
      footer={
        <span>
          <Button onClick={props.pm.toggleAddIssuesModal}>Cancel</Button>
          <Button
            type="primary"
            onClick={() => props.pm.updateIssuesFormSubmit(props)}
            disabled={props.selectedIssueRowIndex !== -1}
          >
            Save
          </Button>
        </span>
      }
    >
      <TableContainer
        filterByFields={['title']}
        tableProps={{
          dataSource: props.defaultIssuesList,
          columns: columns(props),
          rowKey: rowdata => rowdata.id,
          pagination: {
            position: 'both',
            defaultPageSize: 10,
            total: props.defaultIssuesList.length,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
          },
          rowSelection: {
            selectedRowKeys: props.selectedRowKeys,
            onChange: selectedRowKeys => props.pm.onRowsSelect(selectedRowKeys)
          },
          loading: props.isLoadingIssuesList
        }}
        extra={
          <Button
            type="primary"
            onClick={() => props.pm.toggleaddUpdateForm(addFormObj)}
            disabled={props.visible}
          >
            Add Issue
          </Button>
        }
      />
    </Modal>
  )
}

export default AddNewIssueModal
