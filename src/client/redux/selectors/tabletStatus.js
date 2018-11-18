import moment from 'moment'
export const mappedTabletStatus = tabletStatuslist => {
  return tabletStatuslist.map(tablet => {
    const tab = {
      new_email: tablet.email || '--',
      new_mac_address: tablet.mac_address || '--',
      new_ts: moment(tablet.ts).format('MM-DD-YYYY hh:mm:ss a'),
      ...tablet
    }
    if (tablet.connected) {
      tab.new_battery_level =
        tablet.battery_level === null ? '--' : tablet.battery_level + '%'
    } else {
      tab.new_battery_level = '--'
    }
    return tab
  })
}
