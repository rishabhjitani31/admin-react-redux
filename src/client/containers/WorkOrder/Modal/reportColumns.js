import React from 'react'
import { Popconfirm, Icon } from 'antd'

export default function(props) {
  return [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Part No.',
      dataIndex: 'part_no',
      key: 'part_no'
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <Popconfirm
          title={'This entry will be deleted!'}
          onConfirm={() => props.deletePartsData(record)}
          okText="Yes"
          cancelText="No"
        >
          <div className="controller-div">
            <Icon type="delete" />
          </div>
        </Popconfirm>
      )
    }
  ]
}
