import React from 'react'
import presenter from 'hoc/presenter'
import ReportsPM from './ReportsPM'
import ContainerHeader from 'components/ContainerHeader'
import Extras from './Extras'
import DownloadButtons from './downloadButton'
import ContainerLayout from 'components/ContainerLayout'
import TableContainer from 'components/TableContainer'
import columns from './Columns'
import * as reportActions from 'actions/report'
import * as mainHeaderActions from 'actions/mainHeader'
import * as customerActions from 'actions/customer'
import { mappedReports } from 'selectors/reports'
import './Reports.scss'

const Reports = props => {
  return (
    <div className="reports-container">
      <ContainerHeader title="Reports" extra={<Extras {...props} />} />
      <ContainerLayout>
        <TableContainer
          filterByFields={[
            'issue_id',
            'apt_name',
            'zone_name',
            'city_name',
            'customer_name',
            'new_created_at',
            'title'
          ]}
          tableProps={{
            dataSource: props.reportlist,
            columns: columns(props.pm),
            rowKey: record => record.issue_id,
            loading: props.isFetching,
            pagination: {
              position: 'both',
              defaultPageSize: 20,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
            }
          }}
          extra={<DownloadButtons {...props} />}
        />
      </ContainerLayout>
    </div>
  )
}

export default presenter(
  store => ({
    isFetching: store.report.isFetching,
    customerlist: store.customer.customerlist,
    visible: store.report.visible,
    record: store.report.record,
    filteredCityList: store.report.filteredCityList,
    filteredLocationList: store.report.filteredLocationList,
    allStaffList: store.report.allStaffList,
    allZoneList: store.report.allZoneList,
    reportlist: mappedReports(store.report.reportlist),
    selectedZone: store.report.selectedZone,
    lastCustomer: store.mainHeader.lastCustomer
  }),
  {
    ...reportActions,
    ...mainHeaderActions,
    ...customerActions
  }
)(ReportsPM, Reports)
