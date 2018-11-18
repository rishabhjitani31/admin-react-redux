import { Icon } from 'antd'
import React from 'react'
import imagePlacer from 'assets/images/imagePlacer.jpg'

const handleAction = (text, pm, record, index) => {
  return (
    <div className="actions">
      <div
        onClick={() => {
          pm.showEditPopup(record)
        }}
      >
        <Icon type="edit" />
      </div>
    </div>
  )
}

const handleImage = (text, pm, record, index) => {
  return (
    <span>
      {text.icon_url ? (
        text.icon_url === null ? (
          <img src={imagePlacer} alt="avatar" className="column-thumb-img" />
        ) : text.icon_url.length === 0 ? (
          <img src={imagePlacer} alt="avatar" className="column-thumb-img" />
        ) : (
          <img src={text.icon_url} alt="avatar" className="column-thumb-img" />
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
      title: 'App Name',
      sorter: 'true',
      dataIndex: 'app_name',
      key: 'app_name'
    },
    {
      title: 'Package Name',
      sorter: 'true',
      dataIndex: 'package_name',
      key: 'package_name'
    },
    {
      title: 'Category',
      sorter: 'true',
      dataIndex: 'category_name',
      key: 'category_name'
    },
    {
      title: 'App Icon',
      key: 'icon_url',
      render: (text, record, index) => handleImage(text, pm, record, index)
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => handleAction(text, pm, record, index)
    }
  ]
}
export default column
