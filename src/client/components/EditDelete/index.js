import React from 'react'
import { Popconfirm, Icon, Tooltip } from 'antd'
import './index.scss'

const EditDelete = props => {
  return (
    <div className="model-column-container">
      <Tooltip title="Edit">
        <div onClick={props.onEdit}>
          <Icon type="edit" className="model-icon-edit" />
        </div>
      </Tooltip>
      <Tooltip title="Delete">
        <Popconfirm
          title={props.title}
          onConfirm={props.onRemove}
          okText="Yes"
          cancelText="No"
        >
          <div className="margin-left-10">
            <Icon type="delete" className="model-icon-delete" />
          </div>
        </Popconfirm>
      </Tooltip>
    </div>
  )
}

export default EditDelete
