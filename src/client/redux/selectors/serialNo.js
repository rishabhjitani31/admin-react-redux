//get ticket data for Chart
export const getFilteredValues = (store, key) => {
  const filterArray = store[key][`${key}list`]
  const filteredKey = store.serialNo[`${key}Value`]
  if (key === 'brands') {
    let filteredBrands = filterArray.filter(val => {
      return val.eq_id === filteredKey
    })
    return filteredBrands
  } else if (key === 'model') {
    let filteredBrands = store.model.modellist.filter(val => {
      return val.eq_id === store.serialNo.brandsValue
    })
    let filteredModels = filteredBrands.filter(val => {
      return val.brand_id === filteredKey
    })
    return filteredModels
  } else {
    return []
  }
}

export const getWarrantyMonths = () => {
  let data = []
  for (var i = 0; i < 101; i++) {
    data.push(i)
  }
  return data
}
