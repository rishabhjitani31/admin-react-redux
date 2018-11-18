import moment from 'moment'
import React from 'react'
import imagePlacer from 'assets/images/imagePlacer.jpg'
import EditDelete from 'components/EditDelete'

const column = pm => {
  return [
    {
      title: 'Customer Name',
      sorter: 'true',
      dataIndex: 'customer_name',
      key: 'customer_name'
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
      title: 'Image',
      key: 'image',
      render: text => {
        return (
          <span>
            {text.thumb_url ? (
              text.thumb_url === null ? (
                <img
                  src={imagePlacer}
                  alt="avatar"
                  className="amenity-thumb-img"
                />
              ) : text.thumb_url.length == 0 ? (
                <img
                  src={imagePlacer}
                  alt="avatar"
                  className="amenity-thumb-img"
                />
              ) : (
                <img
                  src={text.thumb_url[0]}
                  alt="avatar"
                  className="amenity-thumb-img"
                />
              )
            ) : (
              <img
                src={imagePlacer}
                alt="avatar"
                className="amenity-thumb-img"
              />
            )}
          </span>
        )
      }
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record, index) => (
        <EditDelete
          onEdit={() => {
            pm.showPopup(record)
          }}
          title={`Customer ${record.customer_name} will be deleted!`}
          onRemove={() => pm.handleDeleteCustomer(record)}
        />
      )
    }
  ]
}
export default column
