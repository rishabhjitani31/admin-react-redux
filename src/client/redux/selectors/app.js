const sortArray = data => {
  return data.sort((a, b) => {
    if (a.app_name > b.app_name) {
      return 1
    }
    if (a.app_name < b.app_name) {
      return -1
    }
    return 0
  })
}

export const formatArray = appList => {
  appList.forEach(element => {
    if (element.category_id === 1) {
      element.category_name = 'System'
    } else if (element.category_id === 2) {
      element.category_name = 'Tablet'
    } else if (element.category_id === 3) {
      element.category_name = 'Staff'
    } else {
      element.category_name = '--'
    }
  })
  return sortArray(appList)
}
