import React from 'react'
import { Switch } from 'antd'
import EditDelete from 'components/EditDelete'
const showActiveStatus = (rowData, props) => {
  return (
    <div className="Apartment-action-container">
      <div className="controller-div">
        <Switch
          size="small"
          defaultChecked={rowData.active}
          onChange={e => props.onActivateChange(e, rowData.id)}
        />
      </div>
    </div>
  )
}

export default function(props) {
  return [
    {
      title: 'Equipment Name',
      sorter: 'true',
      dataIndex: 'eq_name',
      key: 'apt_name'
    },
    {
      title: 'Brand Name',
      sorter: 'true',
      dataIndex: 'brand_name',
      key: 'city_name'
    },
    {
      title: 'Model Name',
      sorter: 'true',
      dataIndex: 'model_name',
      key: 'apt_id'
    },
    {
      title: 'Serial No',
      sorter: 'true',
      dataIndex: 'sr_no',
      key: 'Sr_No'
    },
    {
      title: 'Activate',
      sorter: 'true',
      key: 'active',
      render: rowData => showActiveStatus(rowData, props)
    },
    {
      title: 'Actions',
      key: 'actoins',
      render: rowData => (
        <EditDelete
          onEdit={() => {
            props.editEquipmentModal(rowData)
          }}
          title="Are you sure you want to delete Serial No?"
          onRemove={() => props.deleteEquipment(rowData)}
        />
      )
    }
  ]
}
