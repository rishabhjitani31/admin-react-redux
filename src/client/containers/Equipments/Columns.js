import React from 'react'
import { Button } from 'antd'
import moment from 'moment'
import placeholderImg from 'assets/images/imagePlacer.jpg'
import EditDelete from 'components/EditDelete'
export default props => [
  {
    title: 'Equipment Name',
    dataIndex: 'eq_name',
    key: 'eq_name'
  },
  {
    title: 'Created On',
    dataIndex: 'date_created',
    key: 'date_created',
    render: text => {
      return moment(text).format('MM-DD-YYYY hh:mm:ss a')
    }
  },
  {
    title: 'Image',
    dataIndex: 'thumb_url',
    key: 'thumb_url',
    render: (data, row) => (
      <img
        src={
          row.thumb_url.length
            ? row.thumb_url[row.thumb_url.length - 1]
            : placeholderImg
        }
        className="equip-list-img"
      />
    )
  },
  {
    title: 'Actions',
    key: 'actions',
    dataIndex: 'actions',
    render: (data, row) => (
      <EditDelete
        onEdit={() => {
          props.pm.toggleEquipmentsForEdit(row)
        }}
        title="Equipment has been deleted."
        onRemove={() => props.pm.deleteEquipment(row)}
      />
    )
  },
  {
    title: 'Add Issues',
    key: 'address',
    dataIndex: 'address',
    render: (data, row) => (
      <Button
        type="primary"
        shape="circle"
        icon="plus"
        onClick={() => props.pm.toggleAddIssuesModal(row)}
      />
    )
  }
]
