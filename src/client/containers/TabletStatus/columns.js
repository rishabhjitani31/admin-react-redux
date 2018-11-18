import { Popconfirm, Icon, Tooltip } from 'antd'
import React from 'react'

const handleAction = (text, pm, record, index) => {
  return (
    <div style={{ display: 'flex' }}>
      <Tooltip placement="bottomRight" title="Refresh tablet status">
        <div
          onClick={() => {
            pm.onReloadTabletStatus(record)
          }}
        >
          <Icon type="reload" style={{ color: '#3151c5' }} />
        </div>
      </Tooltip>
      <Tooltip placement="bottomRight" title="Reboot tablet">
        <Popconfirm
          title="Are you sure you want to reboot this Tablet?"
          onConfirm={() => pm.onRebootTabletStatus(record)}
          okText="Yes"
          cancelText="No"
          style={{ alignSelf: 'center', textAlign: 'center' }}
        >
          <div className="controller-div" style={{ marginLeft: '5px' }}>
            <Icon type="logout" />
          </div>
        </Popconfirm>
      </Tooltip>
    </div>
  )
}

const column = pm => {
  return [
    {
      title: 'Location',
      dataIndex: 'apt_name',
      key: 'apt_name'
    },
    {
      title: 'App Version',
      dataIndex: 'app_version',
      key: 'app_version'
    },
    {
      title: 'Email',
      dataIndex: 'new_email',
      key: 'new_email'
    },
    {
      title: 'MAC Address',
      dataIndex: 'new_mac_address',
      key: 'new_mac_address'
    },
    {
      title: 'Battery Level',
      dataIndex: 'new_battery_level',
      key: 'new_battery_level'
    },
    {
      title: 'Charging',
      dataIndex: 'is_charging',
      key: 'is_charging',
      render: (is_charging, record) => {
        if (record.connected) {
          return (
            <span>
              {is_charging ? (
                <span className="Active-Cell Active-yes">On</span>
              ) : (
                <span>--</span>
              )}
            </span>
          )
        } else {
          return <span>--</span>
        }
      }
    },
    {
      title: 'Connected',
      dataIndex: 'connected',
      key: 'connected',
      render: connected => {
        return (
          <span>
            {connected ? (
              <span className="Active-Cell Active-yes">Yes</span>
            ) : (
              <span className="Active-Cell Active-no">No</span>
            )}
          </span>
        )
      }
    },
    {
      title: 'Last Updated',
      dataIndex: 'new_ts',
      key: 'new_ts'
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (text, record, index) => handleAction(text, pm, record, index)
    }
  ]
}
export default column
