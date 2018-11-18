import React from 'react'
import { Switch, Icon, Input, Avatar } from 'antd'
import EditDelete from 'components/EditDelete'

export default props => [
  {
    title: 'File Name',
    dataIndex: 'file_name',
    key: 'file_name',
    render: (data, row, index) => {
      let filename = row.file_name.split('.')
      if (index === props.modalToEditIndex) {
        return (
          <Input
            defaultValue={filename[0]}
            onChange={props.pm.handlleFilenameChange}
            className="editFileNameInput"
          />
        )
      } else return filename[0]
    }
  },
  {
    title: 'File Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Files',
    dataIndex: 'files',
    key: 'files',
    render: (data, rowData) => {
      return (
        <span>
          {rowData.type === 'application/pdf' ? (
            <a href={rowData.url} target="_blank" rel="noopener noreferrer">
              <Icon type="file-pdf" />
            </a>
          ) : (
            <a href={rowData.url} target="_blank" rel="noopener noreferrer">
              <Avatar shape="square" size="small" src={rowData.url} />
            </a>
          )}
        </span>
      )
    }
  },
  {
    title: 'Active',
    dataIndex: 'active',
    key: 'active',
    render: (data, rowData) => {
      return (
        <Switch
          size="small"
          defaultChecked={rowData.active}
          onChange={isChecked =>
            props.pm.activeDeactiveManual(isChecked, rowData)
          }
        />
      )
    }
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: (row, rowData, index) => {
      if (index === props.modalToEditIndex) {
        return (
          <span>
            <Icon
              type="check"
              theme="outlined"
              className="uploadModalAction"
              onClick={() => props.pm.updateManual(rowData)}
            />
            <Icon
              type="close"
              theme="outlined"
              className="uploadModalAction"
              onClick={() => props.pm.setEditingModal({}, -1)}
            />
          </span>
        )
      }
      return (
        <EditDelete
          title={'Manual will be deleted!'}
          onEdit={() => props.pm.setEditingModal(rowData, index)}
          onRemove={() => props.pm.deleteModal(rowData)}
        />
      )
    }
  }
]
