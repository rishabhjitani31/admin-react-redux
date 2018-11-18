export const getLocalStorageData = data => {
  const commonData = JSON.parse(localStorage.getItem('commonData'))
  let returnData = {}
  data.forEach(element => {
    Object.entries(commonData).forEach(([key, value]) => {
      if (element === key) {
        returnData[key] = value
      }
    })
  })
  return data && data.length ? returnData : commonData
}

export const setLocalStorageData = data => {
  localStorage.setItem('commonData', JSON.stringify(data))
}
