import moment from 'moment'
import React from 'react'
import EditDelete from 'components/EditDelete'

const column = pm => {
  return [
    {
      title: 'City Name',
      sorter: 'true',
      dataIndex: 'city_name',
      key: 'city_name'
    },
    {
      title: 'Zone Name',
      sorter: 'true',
      dataIndex: 'zone_name',
      key: 'zone_name'
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
      title: 'Actions',
      key: 'action',
      render: (text, record, index) => (
        <EditDelete
          onEdit={() => {
            pm.showEditPopup(record)
          }}
          title={`City ${record.city_name} will be deleted!`}
          onRemove={() => pm.confirmForDeleteCity(record)}
        />
      )
    }
  ]
}
export default column
