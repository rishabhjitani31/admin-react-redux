import React from 'react'
import { Icon, Button } from 'antd'
import EditDelete from 'components/EditDelete'

export default props => [
  {
    title: 'Issue Names',
    dataIndex: 'title',
    key: 'title',
    render: (data, row, index) => {
      if (index === props.selectedIssueRowIndex) {
        return (
          <input
            defaultValue={typeof row.title !== 'object' ? row.title : ''}
            onChange={e => props.pm.handleEditIssueChange(e)}
          />
        )
      } else {
        return row.title
      }
    }
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (data, row, index) => {
      if (row.id === 'addForm') {
        return (
          <div>
            <Button
              type="success"
              icon="check"
              className="add-issue-action-buttons"
              onClick={props.pm.addNewIssue}
            />
            <Button
              type="danger"
              icon="close"
              className="add-issue-action-buttons"
              onClick={props.pm.toggleaddUpdateForm}
            />
          </div>
        )
      } else {
        if (index === props.selectedIssueRowIndex) {
          return (
            <div className="disp-flex">
              <Icon
                type="check"
                theme="outlined"
                className="issues-action-buttons"
                onClick={props.pm.updateSelectedIssue}
              />
              <Icon
                type="close"
                theme="outlined"
                className="issues-action-buttons"
                onClick={props.pm.cancelIssueEditing}
              />
            </div>
          )
        } else {
          return (
            <EditDelete
              title={'Issue will be deleted!'}
              onEdit={() => props.pm.editCurrentIssue(row, index)}
              onRemove={() => props.pm.deleteIssue(row.id)}
            />
          )
        }
      }
    }
  }
]
