import { gql } from 'apollo-boost'
const getReports = gql`
  query getReportsList(
    $zone_id: ID
    $city_id: ID
    $customer_id: ID
    $apt_id: ID
    $staff_id: ID
    $startdate: String
    $enddate: String
  ) {
    getReportsList(
      zone_id: $zone_id
      city_id: $city_id
      customer_id: $customer_id
      apt_id: $apt_id
      staff_id: $staff_id
      startdate: $startdate
      enddate: $enddate
    ) {
      issue_id
      apt_name
      zone_name
      city_name
      customer_name
      created_at
      title
      brand_name
      eq_name
      assignee_name
      sr_no
      custom_eq_name
      custom_brand_name
      custom_model_name
      custom_sr_no
      model_name
      updated_at
      ticket_start
      ticket_complete
    }
  }
`
const getStaffList = gql`
  {
    staffList {
      staff_id
      first_name
      last_name
    }
  }
`
const getCustomerList = gql`
  {
    customers {
      customer_id
      customer_name
    }
  }
`
const getZoneList = gql`
  {
    zones {
      zone_id
      zone_name
    }
  }
`
const getLocationList = gql`
  query locations($zone_id: ID!, $city_id: ID!) {
    locations(zone_id: $zone_id, city_id: $city_id) {
      apt_id
      apt_name
    }
  }
`
const getCitiesList = gql`
  query cities($zone_id: ID!) {
    cities(zone_id: $zone_id) {
      city_id
      city_name
    }
  }
`
export {
  getReports,
  getStaffList,
  getCustomerList,
  getZoneList,
  getLocationList,
  getCitiesList
}
