import { Popconfirm, Icon } from 'antd'
import React from 'react'
const handleAction = (text, pm, record, index) => {
  return (
    <div className="actions">
      <div
        onClick={() => {
          pm.showEditPopup(record)
        }}
      >
        <Icon className="anticon-edit" type="edit" />
      </div>
      <Popconfirm
        title={`Staff ${record.first_name} will be deleted!`}
        onConfirm={() => pm.confirmForDeleteStaff(record)}
        okText="Yes"
        cancelText="No"
      >
        <div>
          <Icon className="anticon-delete" type="delete" />
        </div>
      </Popconfirm>
    </div>
  )
}

const column = pm => {
  return [
    {
      title: '#',
      sorter: 'true',
      dataIndex: '#',
      render: (text, record, index) => index + 1,
      key: '#'
    },
    {
      title: 'Name',
      sorter: 'true',
      dataIndex: 'full_name',
      key: 'full_name'
    },
    {
      title: 'Email Address',
      sorter: 'true',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      sorter: 'true',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Role',
      sorter: 'true',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record, index) => handleAction(text, pm, record, index)
    }
  ]
}

export default column
