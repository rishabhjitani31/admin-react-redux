import React from 'react'
import moment from 'moment'
import { Tag, Badge } from 'antd'

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
const filterOptions = [
  { text: 'Pending', value: 1 },
  { text: 'In Progress', value: 3 },
  { text: 'Completed', value: 4 },
  { text: 'Verified', value: 5 }
]
export default function() {
  return [
    {
      title: 'Issue No.',
      dataIndex: 'issue_id',
      key: 'issue_id',
      sorter: true,
      render: (text, record) => {
        return (
          <div>
            {text}
            {parseInt(record.count) > 0 && (
              <Badge
                className="left-margin"
                count={'New'}
                key={record.issue_id}
              />
            )}
          </div>
        )
      }
    },
    {
      title: 'Outlet Name',
      dataIndex: 'apt_name',
      key: 'apt_name',
      sorter: true
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      render: text => {
        return <div className="overflowWords">{text}</div>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: filterOptions,
      render: record => showTicketStatus(record)
    },
    {
      title: 'In Warranty',
      dataIndex: 'isWarrenty',
      key: 'isWarrenty',
      render: text => {
        return (
          <span>
            {text == 'true' ? (
              <span className="Active-Cell Active-yes">Yes</span>
            ) : text == 'false' ? (
              <span className="Active-Cell Active-no">No</span>
            ) : (
              <span>--</span>
            )}
          </span>
        )
      }
    },
    {
      title: 'Modified On',
      dataIndex: 'updated_at',
      key: 'updated_at',
      sorter: true,
      render: record => {
        return moment(record).format('dddd, MMMM Do YYYY, h:mm:ss a')
      }
    }
  ]
}
