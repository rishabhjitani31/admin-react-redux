const column = pm => {
  return [
    {
      title: 'Issue No.',
      dataIndex: 'issue_id',
      key: 'issue_id'
    },
    {
      title: 'Location',
      dataIndex: 'apt_name',
      key: 'apt_name'
    },
    {
      title: 'Zone',
      dataIndex: 'zone_name',
      key: 'zone_name'
    },
    {
      title: 'City',
      dataIndex: 'city_name',
      key: 'city_name'
    },
    {
      title: 'Customer',
      dataIndex: 'customer_name',
      key: 'customer_name'
    },
    {
      title: 'Issue Date',
      dataIndex: 'new_created_at',
      key: 'new_created_at'
    },
    {
      title: 'Nature of Complain',
      dataIndex: 'title',
      key: 'title'
    }
  ]
}
export default column
