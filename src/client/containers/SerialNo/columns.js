import React from 'react'
import EditDelete from 'components/EditDelete'
import { Tooltip, Icon } from 'antd'

const showActiveStatus = rowData => {
  return (
    <div>
      {rowData ? (
        <span className="Active-Cell Active-yes">Yes</span>
      ) : (
        <span className="Active-Cell Active-no">No</span>
      )}
    </div>
  )
}

const addeditHistory = (pm, rowData) => {
  return (
    <div className="serial-no-action-container">
      <div
        className="controller-div"
        onClick={() => {
          pm.handleEquipmentInformation(rowData)
        }}
      >
        <Tooltip title="Equipment History">
          <Icon type="book" theme="outlined" />
        </Tooltip>
      </div>
    </div>
  )
}

const column = pm => {
  return [
    {
      title: 'Outlet Name',
      sorter: 'true',
      dataIndex: 'apt_name',
      key: 'apt_name'
    },
    {
      title: 'Serial No',
      sorter: 'true',
      dataIndex: 'sr_no',
      key: 'sr_no'
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
      title: 'Active',
      sorter: 'true',
      dataIndex: 'active',
      key: 'active',
      render: rowData => showActiveStatus(rowData)
    },
    {
      title: 'History',
      key: 'actoins1',
      render: rowData => addeditHistory(pm, rowData)
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record, index) => (
        <EditDelete
          title={`Serial No ${record.sr_no} will be deleted!`}
          name={record.model_name}
          onEdit={() => pm.showEditPopup(record)}
          onRemove={() => pm.confirmForDeleteCity(record)}
        />
      )
    }
  ]
}
export default column
