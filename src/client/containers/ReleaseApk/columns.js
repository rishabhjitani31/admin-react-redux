import React from 'react'
import { Icon, Input, Tooltip, Popconfirm } from 'antd'
import moment from 'moment'
const { TextArea } = Input

const handlePublish = (text, pm, record, index) => {
  return (
    <div className="action">
      <div>
        {!record.ispublished ? (
          <Popconfirm
            title="Are you sure you want to publish this apk?"
            onConfirm={() => pm.publishApk(record)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="bottom" title="Publish Apk">
              <div className="controller-div">
                <Icon type="to-top" />
              </div>
            </Tooltip>
          </Popconfirm>
        ) : (
          <Tooltip placement="bottom" title="Apk published">
            <Icon type="check" />
          </Tooltip>
        )}
      </div>
      <div>
        <Tooltip placement="bottom" title="Download Apk">
          <Icon
            type="download"
            onClick={() => pm.updateDownloadcount(record)}
          />
        </Tooltip>
      </div>
    </div>
  )
}

const handleApp = (text, pm, record, index) => {
  if (text.indexOf('aavgo.equinox') > 0) {
    if (text.indexOf('tablet') > 0) {
      return <span className="Active-Cell isTablet">Tablet</span>
    } else if (text.indexOf('staff') > 0) {
      return <span className="Active-Cell isStaff">Staff</span>
    } else {
      return <span className="Active-Cell isOther">{record.app_name}</span>
    }
  } else if (text.indexOf('google.android') > 0) {
    return <span className="Active-Cell isSystem">{record.app_name}</span>
  } else {
    return <span className="Active-Cell isOther">{record.app_name}</span>
  }
}

const handleDetails = (text, pm, record, index) => {
  return (
    <TextArea
      autosize={{ minRows: 2, maxRows: 5 }}
      readOnly
      className="column-textArea"
      value={text}
    />
  )
}
const handleActiveStatus = (text, pm, record, index) => {
  return (
    <span className="Active">
      {text == 1 ? (
        <span className="Active-Cell Active-yes">Yes</span>
      ) : text == 0 ? (
        <span className="Active-Cell Active-no">No</span>
      ) : (
        '--'
      )}
    </span>
  )
}

const column = pm => {
  return [
    {
      title: 'App',
      dataIndex: 'package_name',
      key: 'package_name',
      render: (text, record, index) => handleApp(text, pm, record, index)
    },
    {
      title: 'Version',
      width: 80,
      sorter: 'true',
      dataIndex: 'version_number',
      key: 'version_number'
    },
    {
      title: 'Build Version',
      sorter: 'true',
      dataIndex: 'build_version',
      key: 'build_version'
    },
    {
      title: 'Added on',
      dataIndex: 'ts',
      key: 'ts',
      render: text => moment(text).format('MM-DD-YYYY hh:mm:ss a')
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      render: (text, record, index) => handleDetails(text, pm, record, index)
    },
    {
      title: 'Priority',
      width: 80,
      dataIndex: 'download_priority',
      render: (text, record, index) => (
        <span key={index}>{text == 2 ? 'At Night' : 'Immediate'}</span>
      )
    },
    {
      title: 'Active',
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) =>
        handleActiveStatus(text, pm, record, index)
    },
    {
      title: 'Count',
      width: 80,
      dataIndex: 'download_count',
      key: 'download_count',
      sorter: 'true'
    },
    {
      title: 'Actions',
      width: 80,
      dataIndex: 'publish',
      key: 'publish',
      render: (text, record, index) => handlePublish(text, pm, record, index)
    }
  ]
}
export default column
