export const getFilteredValues = store => {
  if (store.staff.zone_id) {
    const list = store.city.citylist.filter(
      city => city.zone_id === store.staff.zone_id
    )
    return list
  } else {
    return []
  }
}

export const mappedStaffList = staffList => {
  return staffList.map(staff => {
    return {
      full_name: `${staff.first_name} ${staff.last_name}`,
      ...staff
    }
  })
}
