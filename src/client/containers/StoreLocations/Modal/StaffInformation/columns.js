import React from 'react'
export default function(props) {
  return [
    {
      title: '#',
      key: 'inx',
      render: (rowData, record, index) => <span> {index + 1} </span>
    },
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'first_name'
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: rowData => (rowData && rowData != 'null' ? rowData : '--')
    },
    {
      title: 'Role',
      dataIndex: 'user_role',
      key: 'user_role'
    }
  ]
}
