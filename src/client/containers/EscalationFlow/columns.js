import React from 'react'
import { Popconfirm, Icon } from 'antd'

const handleAction = (text, pm, record, index) => {
  return (
    <div className="escalation-column-container">
      <div
        onClick={() => {
          pm.showModal(record)
        }}
      >
        <Icon type="edit" className="escalation-icon-edit" />
      </div>
      <Popconfirm
        title="This entry will be deleted!"
        onConfirm={() => pm.confirmForDeleteScheduleMail(record)}
        okText="Yes"
        cancelText="No"
      >
        <div className="escalation-icon-div">
          <Icon type="delete" className="escalation-icon-delete" />
        </div>
      </Popconfirm>
    </div>
  )
}

const column = pm => {
  return [
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
      title: 'Hours',
      sorter: 'true',
      dataIndex: 'hours',
      key: 'hours'
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (text, record, index) => handleAction(text, pm, record, index)
    }
  ]
}
export default column
