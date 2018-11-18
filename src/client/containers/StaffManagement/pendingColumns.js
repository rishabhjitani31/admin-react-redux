import { Popconfirm, Icon } from 'antd'
import React from 'react'
const handleAction = (text, pm, record, index) => {
  return (
    <div className="actions">
      <Popconfirm
        title="Are you sure to resend this invitation?"
        onConfirm={() => pm.resendVerificationLink(record)}
        okText="Yes"
        cancelText="No"
      >
        <div>
          <Icon type="rollback" />
        </div>
      </Popconfirm>
      <Popconfirm
        title="Staff will be deleted!"
        onConfirm={() => pm.confirmForDeleteStaffInvitation(record)}
        okText="Yes"
        cancelText="No"
      >
        <div>
          <Icon type="delete" />
        </div>
      </Popconfirm>
    </div>
  )
}

const pendingcolumn = pm => {
  return [
    {
      title: 'Email Address',
      sorter: 'true',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      sorter: 'true',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Invite Link',
      sorter: 'true',
      dataIndex: 'inviteLink',
      render: (text, record) => {
        return (
          <a
            className="verify-invitation"
            onClick={() => pm.onVerifyModalToggle(record)}
          >
            Verify Invitation
          </a>
        )
      },
      key: 'inviteLink'
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record, index) => handleAction(text, pm, record, index)
    }
  ]
}

export default pendingcolumn
