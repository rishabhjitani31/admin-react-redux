import React from 'react'
import { Modal, Avatar, Icon } from 'antd'
import TableContainer from 'components/TableContainer'

const columns = [
  {
    title: 'File Name',
    dataIndex: 'url',
    key: 'type',
    render: text => <span>{text.split('/').pop()}</span>
  },
  {
    title: 'Files',
    dataIndex: 'url',
    key: 'url',
    render: (text, record) => {
      return (
        <span>
          {record.type === 'application/pdf' ? (
            <a href={text}>
              <Icon type="file-pdf" />
            </a>
          ) : (
            <a href={text}>
              <Avatar shape="square" size="small" src={text} />
            </a>
          )}
        </span>
      )
    }
  }
]
const manualsModal = props => {
  return (
    <Modal
      title="Manuals"
      visible={props.manualsModalVisibe}
      onCancel={() => props.getManualsModalVisible(false)}
      footer={[]}
      className="workorder-modal"
    >
      <TableContainer
        filterByFields={[]}
        tableProps={{
          dataSource: props.orderDetail.manual_url,
          columns: columns,
          rowKey: record => record.url,
          pagination: false
        }}
      />
    </Modal>
  )
}

export default manualsModal
