import React from 'react'
import moment from 'moment'
import { Tag } from 'antd'

const showTicketStatus = record => {
  return (
    <div>
      {record === 1 ? (
        <Tag color="#e26d3a" className="Default-cursor">
          Pending
        </Tag>
      ) : record === 3 ? (
        <Tag color="#3797d8" className="Default-cursor">
          In Progress
        </Tag>
      ) : record === 4 ? (
        <Tag color="#35b153" className="Default-cursor">
          Completed
        </Tag>
      ) : record === 5 ? (
        <Tag color="#35b153" className="Default-cursor">
          Verified
        </Tag>
      ) : record === 2 ? (
        <Tag color="#c62e2e" className="Default-cursor">
          Reopened
        </Tag>
      ) : null}
    </div>
  )
}

export default function() {
  return [
    {
      title: 'Outlets',
      dataIndex: 'apt_name',
      key: 'apt_name'
    },
    {
      title: 'Issue No',
      dataIndex: 'issue_id',
      key: 'issue_id'
    },
    {
      title: 'Issue',
      dataIndex: 'title',
      key: 'title',
      className: 'overflowWords'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: record => showTicketStatus(record)
    },
    {
      title: 'Modified On',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: record => moment(record).format('dddd, MMMM Do YYYY, h:mm:ss a')
    }
  ]
}
