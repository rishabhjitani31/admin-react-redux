import React from 'react'

const showActiveStatus = rowData => {
  return (
    <span>
      {rowData.active ? (
        <span className="Active-Cell Active-yes">Yes</span>
      ) : (
        <span className="Active-Cell Active-no">No</span>
      )}
    </span>
  )
}
export default function(props) {
  return [
    {
      title: 'Outlet Name',
      sorter: 'true',
      dataIndex: 'apt_name',
      key: 'apt_name'
    },
    {
      title: 'Equipment Name',
      sorter: 'true',
      dataIndex: 'eq_name',
      key: 'eq_name'
    },
    {
      title: 'Brand Name',
      sorter: 'true',
      dataIndex: 'brand_name',
      key: 'brand_name'
    },
    {
      title: 'Model Name',
      sorter: 'true',
      dataIndex: 'model_name',
      key: 'model_name'
    },
    {
      title: 'Serial No',
      sorter: 'true',
      dataIndex: 'sr_no',
      key: 'sr_no'
    },
    {
      title: 'Activate',
      sorter: 'true',
      key: 'active',
      render: rowData => showActiveStatus(rowData)
    }
  ]
}
