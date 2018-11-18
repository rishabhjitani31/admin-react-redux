import moment from 'moment'
import React from 'react'
import EditDelete from 'components/EditDelete'

const column = pm => {
  return [
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
          title={`Zone ${record.zone_name} will be deleted!`}
          onRemove={() => pm.confirmForDeleteZone(record)}
        />
      )
    }
  ]
}
export default column
