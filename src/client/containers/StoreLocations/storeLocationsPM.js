import service from 'api/storeLocationsService'
import { message } from 'antd'
class StoreLocationsPM {
  constructor(props) {
    this.props = props
  }
  fetch() {
    this.props.getStoreLocationsLists()
  }
  editOutletInformation = async record => {
    const response = await service.getLocationEquipments(
      record.apt_id,
      'location'
    )
    localStorage.setItem('aptDetail', JSON.stringify(response.data.aptDetail))
    this.props.getCityList()
    this.props.getZoneList()
    this.props.getCustomerList()
    this.props.history.push({
      pathname: '/editLocation'
    })
  }

  onDeleteStoreLocation = async record => {
    const result = await service.onDeleteStoreLocation(record.apt_id)
    if (result.status == 1) {
      message.success('Outlet Deleted  Successfully')
      this.fetch()
    } else {
      message.error(result.message)
    }
  }

  handleSatffInformation = record => {
    localStorage.setItem('selectSatffInformation', JSON.stringify(record))
    this.props.getSatffInformation(record.apt_id)
    this.props.history.push({
      pathname: '/staffInformation'
    })
  }

  editStoreLocation = record => {
    localStorage.setItem('selectEquipment', JSON.stringify(record))
    this.props.getLocationEquipmentsLists(record.apt_id)
    this.props.history.push({
      pathname: '/editEquipment'
    })
  }

  onTrackFilter(pagination, filters, sorter) {
    const data = {
      page: pagination.current - 1,
      rows: pagination.pageSize,
      sort: sorter.columnKey,
      sortBy: sorter.order !== 'descend' ? 'ASC' : 'DESC'
    }
    this.props.getStoreLocationsLists(data)
  }
  downloadLocations = async () => {
    const response = await service.exportLocationData()
    if (response.success) {
      var link = document.createElement('a')
      link.download = response.url.split('/').pop()
      link.href = response.url
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
  onSearchApartments = search => {
    const data = {
      search
    }
    this.props.getStoreLocationsLists(data)
  }
}
export default StoreLocationsPM
