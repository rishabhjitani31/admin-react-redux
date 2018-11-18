import { appServiceName } from 'utils/environment'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {
  getReports,
  getCustomerList,
  getZoneList,
  getStaffList,
  getCitiesList,
  getLocationList
} from 'containers/Reports/Query'
import { getLocalStorageData } from 'utils/localStorage'
class ReportsService {
  get url() {
    return appServiceName
  }

  get client() {
    const httpLink = new HttpLink({ uri: `${this.url}/graphql` })

    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache()
    })
  }

  getReportList(values) {
    const ids = getLocalStorageData([
      'sessionToken',
      'staff_id',
      'community_id',
      'last_customer'
    ])
    let data = {
      staff: ids.staff_id,
      community_id: ids.community_id,
      Token: ids.sessionToken,
      ...values
    }
    if (values && values.customer_id) {
      data.customer_id = values.customer_id
    } else {
      if (ids.last_customer) data.customer_id = ids.last_customer
    }

    return this.client.query({
      query: getReports,
      variables: { ...data }
    })
  }

  getAllCustomerList() {
    const ids = getLocalStorageData([
      'sessionToken',
      'staff_id',
      'community_id'
    ])
    let data = {
      staff: ids.staff_id,
      community_id: ids.community_id,
      Token: ids.sessionToken
    }
    return this.client.query({
      query: getCustomerList,
      variables: { ...data }
    })
  }
  getAllZoneList() {
    const ids = getLocalStorageData([
      'sessionToken',
      'staff_id',
      'community_id'
    ])
    let data = {
      staff: ids.staff_id,
      community_id: ids.community_id,
      Token: ids.sessionToken
    }
    return this.client.query({
      query: getZoneList,
      variables: { ...data }
    })
  }

  getAllStaffList() {
    const ids = getLocalStorageData([
      'sessionToken',
      'staff_id',
      'community_id'
    ])
    let data = {
      staff: ids.staff_id,
      community_id: ids.community_id,
      Token: ids.sessionToken
    }
    return this.client.query({
      query: getStaffList,
      variables: { ...data }
    })
  }

  getCityByZoneId(zone_id) {
    const ids = getLocalStorageData([
      'sessionToken',
      'staff_id',
      'community_id'
    ])
    let data = {
      staff: ids.staff_id,
      community_id: ids.community_id,
      Token: ids.sessionToken,
      zone_id: zone_id
    }
    return this.client.query({
      query: getCitiesList,
      variables: { ...data }
    })
  }
  getLocationByCityZoneId(zone_id, city_id) {
    const ids = getLocalStorageData([
      'sessionToken',
      'staff_id',
      'community_id'
    ])
    let data = {
      staff: ids.staff_id,
      community_id: ids.community_id,
      Token: ids.sessionToken,
      zone_id: zone_id,
      city_id: city_id
    }
    return this.client.query({
      query: getLocationList,
      variables: { ...data }
    })
  }
}

const inst = new ReportsService()
export default inst
