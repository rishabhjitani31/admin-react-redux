import React from 'react'
import { Icon } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'
import EditDelete from 'components/EditDelete'
import './models.scss'

const column = pm => {
  return [
    {
      title: 'Model Name',
      sorter: 'true',
      dataIndex: 'model_name',
      key: 'model_name'
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
      title: 'Created on',
      sorter: 'true',
      dataIndex: 'date_created',
      key: 'date_created',
      render: text => {
        return moment(text).format('MM-DD-YYYY hh:mm:ss a')
      }
    },
    {
      title: 'Manuals',
      dataIndex: 'manual_url',
      key: 'manual_url',
      render: (text, rowData) => {
        return (
          <Link
            to={{
              pathname: '/uploadModelFiles',
              state: { model_id: rowData.model_id }
            }}
          >
            <Icon type="upload" />
          </Link>
        )
      }
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record, index) => (
        <EditDelete
          title={`Model ${record.model_name} will be deleted!`}
          name={record.model_name}
          onEdit={() => pm.showModal(record)}
          onRemove={() => pm.deleteModel(record)}
        />
      )
    }
  ]
}
export default column
