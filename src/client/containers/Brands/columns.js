import moment from 'moment'
import React from 'react'
import imagePlacer from 'assets/images/imagePlacer.jpg'
import EditDelete from 'components/EditDelete'

const handleImage = (text, pm, record, index) => {
  return (
    <span>
      {text.thumb_url ? (
        text.thumb_url === null ? (
          <img src={imagePlacer} alt="avatar" className="column-thumb-img" />
        ) : text.thumb_url.length === 0 ? (
          <img src={imagePlacer} alt="avatar" className="column-thumb-img" />
        ) : (
          <img
            src={text.thumb_url[text.thumb_url.length - 1]}
            alt="avatar"
            className="column-thumb-img"
          />
        )
      ) : (
        <img src={imagePlacer} alt="avatar" className="column-thumb-img" />
      )}
    </span>
  )
}

const column = pm => {
  return [
    {
      title: 'Brand Name',
      sorter: 'true',
      dataIndex: 'brand_name',
      key: 'brand_name'
    },
    {
      title: 'Equipment Name',
      sorter: 'true',
      dataIndex: 'eq_name',
      key: 'eq_name'
    },
    {
      title: 'Created on',
      sorter: 'true',
      dataIndex: 'date_created',
      key: 'date_created',
      render: text => moment(text).format('MM-DD-YYYY hh:mm:ss a')
    },
    {
      title: 'Image',
      key: 'thumb_url',
      render: (text, record, index) => handleImage(text, pm, record, index)
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record, index) => (
        <EditDelete
          title={`Brand ${record.brand_name} will be deleted!`}
          onEdit={() => pm.showEditPopup(record)}
          onRemove={() => pm.confirmForDeleteBrand(record)}
        />
      )
    }
  ]
}
export default column
