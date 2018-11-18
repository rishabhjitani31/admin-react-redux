import React from 'react'
import { Icon, Tooltip } from 'antd'
import EditDelete from 'components/EditDelete'
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

const addeditStaff = (pm, rowData) => {
  return (
    <div className="Apartment-action-container">
      <div
        className="controller-div"
        onClick={() => {
          pm.handleSatffInformation(rowData)
        }}
      >
        <Tooltip title="View Staff Inforamtion">
          <Icon type="team" />
        </Tooltip>
      </div>
    </div>
  )
}

const addeditEquipment = (pm, rowData) => {
  return (
    <div className="Apartment-action-container">
      <div
        className="controller-div"
        onClick={() => {
          pm.editStoreLocation(rowData)
        }}
      >
        <Tooltip title="Edit Equipment Data">
          <Icon type="edit" />
        </Tooltip>
      </div>
    </div>
  )
}

export default function(pm) {
  return [
    {
      title: 'Outlet Name',
      sorter: 'true',
      dataIndex: 'apt_name',
      key: 'apt_name'
    },
    {
      title: 'City Name',
      sorter: 'true',
      dataIndex: 'city_name',
      key: 'city_name'
    },
    {
      title: 'Total Equipments',
      sorter: 'true',
      dataIndex: 'eqcount',
      key: 'eqcount'
    },
    {
      title: 'Active',
      sorter: 'true',
      dataIndex: 'active',
      key: 'active',
      render: rowData => showActiveStatus(rowData)
    },
    {
      title: 'Edit Equipment',
      key: 'actoins',
      render: rowData => addeditEquipment(pm, rowData)
    },
    {
      title: 'View Staff',
      key: 'actoins1',
      render: rowData => addeditStaff(pm, rowData)
    },
    {
      title: 'Actions',
      key: 'actoins2',
      render: rowData => (
        <EditDelete
          onEdit={() => {
            pm.editOutletInformation(rowData)
          }}
          title="Are you sure you want to delete this location?"
          onRemove={() => pm.onDeleteStoreLocation(rowData)}
        />
      )
    }
  ]
}
