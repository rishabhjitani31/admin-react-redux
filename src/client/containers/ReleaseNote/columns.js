import React from 'react'
import { Icon, Tooltip } from 'antd'
import moment from 'moment'

const showActiveStatus = rowData => {
  return (
    <span>
      {rowData ? (
        <span className="Active-Cell Active-yes">Yes</span>
      ) : (
        <span className="Active-Cell Active-no">No</span>
      )}
    </span>
  )
}

const addeditEquipment = (props, rowData) => {
  return (
    <div className="Apartment-action-container">
      <div
        className="controller-div"
        onClick={() => props.pm.onAddEditModal('edit', rowData)}
      >
        <Tooltip title="Edit Equipment Data">
          <Icon type="edit" />
        </Tooltip>
      </div>
    </div>
  )
}

export default function(props, test) {
  return [
    {
      title: 'Title',
      sorter: 'true',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Version',
      sorter: 'true',
      dataIndex: 'version',
      key: 'version'
    },
    {
      title: 'Release Date',
      sorter: 'true',
      dataIndex: 'release_date',
      key: 'release_date',
      render: (text, record, index) => {
        return moment(text).format('MM-DD-YYYY hh:mm:ss a')
      }
    },
    {
      title: 'Activity status',
      sorter: 'true',
      dataIndex: 'status',
      key: 'status',
      render: rowData => showActiveStatus(rowData)
    },
    {
      title: 'Edit',
      key: 'actoins',
      render: rowData => addeditEquipment(props, rowData)
    }
  ]
}
