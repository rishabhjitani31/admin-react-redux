import moment from 'moment'

export const mappedReports = reportsList => {
  return reportsList.map(report => {
    return {
      ...report,
      apt_name: report.apt_name || '',
      zone_name: report.zone_name || '',
      city_name: report.city_name !== 'null' ? report.city_name : '',
      customer_name: report.customer_name || '',
      new_created_at: moment(report.created_at).format('D MMMM YYYY'),
      title: report.title
    }
  })
}

export const filterCity = store => {
  let filteredCity = []
  if (store.report.selectedZone) {
    filteredCity = store.city.citylist.filter(
      elem => elem.zone_id === store.report.selectedZone
    )
  }
  return filteredCity
}

export const filterLocation = store => {
  let filteredLocation = []
  // if (store.report.selectedCity) {
  //   filteredLocation = store.storeLocation.storeLocationData.result.filter(
  //     elem => elem.city_id === store.report.selectedCity
  //   )
  // }
  return filteredLocation
}
