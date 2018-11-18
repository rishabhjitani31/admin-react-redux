import moment from 'moment'

const reportTitle = 'Equinox Solutions Limited'
const reportAddress = '303 Swagat Building C G Road Ahmedabad 380006 INDIA'
const reportDate = 'Date:' + new Date() + '\n\n '

class ReportsPM {
  filterValues = {}
  constructor(props) {
    this.props = props
  }
  shouldComponentUpdate(props) {
    this.props = props
    return true
  }
  fetch() {
    this.props.getReportList()
    //this.props.getAllCustomerList()
    this.props.getCustomerList()
    this.props.getAllZoneList()
    this.props.getAllStaffList()
  }

  onZoneChange = (e, form) => {
    this.props.onZoneChange(e)
    this.props.getCityByZoneId(parseInt(e, 10))
    form.resetFields('city_id')
    form.resetFields('apt_id')
  }

  onCityChange = (e, form) => {
    form.resetFields('apt_id')
    this.props.getLocationByCityZoneId(form.getFieldValue('zone_id'), e)
    this.props.onCityChange(e)
  }

  filterReports = (e, form) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        if (values.date && values.date.length) {
          values.startdate = moment(values.date[0])
            .milliseconds(0)
            .toISOString()
          values.enddate = moment(values.date[1])
            .milliseconds(0)
            .toISOString()
        } else {
          delete values.date
          delete values.startdate
          delete values.enddate
        }
        Object.keys(values).forEach(
          key => values[key] === undefined && delete values[key]
        )

        this.filterValues = values
        this.props.getReportList(values)
      }
    })
  }

  mappedReportData = () => {
    return this.props.reportlist.map(key => {
      return {
        'Issue No.': key.issue_id || '',
        Location: key.apt_name || '',
        Zone: key.zone_name || '',
        City: key.city_name || '',
        Customer: key.customer_name || '',
        Title: escape(key.title) || '',
        'Assined To': key.assignee_name || '',
        'Equipment Name': key.eq_name || '',
        'Brand Name': key.brand_name || '',
        'Model Name': key.model_name || '',
        'Serial No.': key.sr_no || '',
        'Custom Equipment Name': key.custom_eq_name || '',
        'Custom Brand Name': key.custom_brand_name || '',
        'Custom Model Name': key.custom_model_name || '',
        'Custom Serial No.': key.custom_sr_name || '',
        'Created On': !key.created_at
          ? ''
          : new Date(key.created_at).toLocaleDateString() +
            ' ' +
            new Date(key.created_at).toLocaleTimeString('en-US', {
              hour12: true,
              timeZone: 'Asia/Kolkata',
              hour: '2-digit',
              minute: '2-digit'
            }),
        'Last Update': !key.updated_at
          ? ''
          : new Date(key.updated_at).toLocaleDateString() +
            ' ' +
            new Date(key.updated_at).toLocaleTimeString('en-US', {
              hour12: true,
              timeZone: 'Asia/Kolkata',
              hour: '2-digit',
              minute: '2-digit'
            }),
        'Work Started': !key.ticket_start
          ? ''
          : new Date(key.ticket_start).toLocaleDateString() +
            ' ' +
            new Date(key.ticket_start).toLocaleTimeString('en-US', {
              hour12: true,
              timeZone: 'Asia/Kolkata',
              hour: '2-digit',
              minute: '2-digit'
            }),
        'Work Completed': !key.ticket_complete
          ? ''
          : new Date(key.ticket_complete).toLocaleDateString() +
            ' ' +
            new Date(key.ticket_complete).toLocaleTimeString('en-US', {
              hour12: true,
              timeZone: 'Asia/Kolkata',
              hour: '2-digit',
              minute: '2-digit'
            }),
        'Estimated Time': !key.created_at
          ? ''
          : !key.ticket_complete
            ? ''
            : (moment
                .duration(
                  moment(new Date(key.ticket_complete))
                    .seconds(0)
                    .milliseconds(0)
                    .diff(
                      moment(new Date(key.created_at))
                        .seconds(0)
                        .milliseconds(0)
                    )
                )
                .days() != 0
                ? moment
                    .duration(
                      moment(new Date(key.ticket_complete))
                        .seconds(0)
                        .milliseconds(0)
                        .diff(
                          moment(new Date(key.created_at))
                            .seconds(0)
                            .milliseconds(0)
                        )
                    )
                    .days() + ' days '
                : '') +
              (moment
                .duration(
                  moment(new Date(key.ticket_complete))
                    .seconds(0)
                    .milliseconds(0)
                    .diff(
                      moment(new Date(key.created_at))
                        .seconds(0)
                        .milliseconds(0)
                    )
                )
                .hours() != 0
                ? moment
                    .duration(
                      moment(new Date(key.ticket_complete))
                        .seconds(0)
                        .milliseconds(0)
                        .diff(
                          moment(new Date(key.created_at))
                            .seconds(0)
                            .milliseconds(0)
                        )
                    )
                    .hours() + ' hours '
                : '') +
              (moment
                .duration(
                  moment(new Date(key.ticket_complete))
                    .seconds(0)
                    .milliseconds(0)
                    .diff(
                      moment(new Date(key.created_at))
                        .seconds(0)
                        .milliseconds(0)
                    )
                )
                .minutes() != 0
                ? moment
                    .duration(
                      moment(new Date(key.ticket_complete))
                        .seconds(0)
                        .milliseconds(0)
                        .diff(
                          moment(new Date(key.created_at))
                            .seconds(0)
                            .milliseconds(0)
                        )
                    )
                    .minutes() + ' minutes'
                : ''),
        Status: !key.ticket_status
          ? ''
          : key.ticket_status == 1
            ? 'PENDING'
            : key.ticket_status == 2
              ? 'REOPEN'
              : key.ticket_status == 3
                ? 'IN PROGRESS'
                : key.ticket_status == 4
                  ? 'COMPLETED'
                  : key.ticket_status == 5 ? 'VERIFIED' : ''
      }
    })
  }

  convertArrayOfObjectsToCSV = args => {
    let result, ctr, keys, columnDelimiter, lineDelimiter, data
    data = args.data || null
    if (data === null || !data.length) {
      return null
    }

    columnDelimiter = args.columnDelimiter || ','
    lineDelimiter = args.lineDelimiter || '\n'

    keys = Object.keys(data[0])
    let filterValues = ''
    Object.entries(this.filterValues).forEach(([key, value]) => {
      if (key !== 'Token') {
        filterValues = filterValues.concat(`${key},${value}\n`)
      }
    })
    result = `${reportTitle} \n${reportAddress}\n ${reportDate} \n\n`
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    data.forEach(function(item) {
      ctr = 0
      keys.forEach(function(key) {
        if (ctr > 0) result += columnDelimiter
        result += item[key]
        ctr++
      })
      result += lineDelimiter
    })
    return result
  }

  onDownloadCsv = () => {
    let data, link
    let csv = this.convertArrayOfObjectsToCSV({
      data: this.mappedReportData()
    })
    if (csv === null) return
    csv = 'data:text/csv;charset=utf-8,' + csv
    data = encodeURI(csv)
    link = document.createElement('a')
    link.setAttribute('href', data)
    let customerData = _.find(this.props.allCustomerList, {
      customer_id: this.props.lastCustomer
    })
    if (customerData) {
      link.setAttribute(
        'download',
        `${customerData.customer_name}_${new Date().getTime()}.csv`
      )
    } else {
      link.setAttribute('download', `Report_${new Date().getTime()}.csv`)
    }
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  onDownloadExcel = () => {
    let data, link
    let csv = this.convertArrayOfObjectsToCSV({
      data: this.mappedReportData()
    })
    if (csv === null) return
    csv =
      'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-16,' +
      csv
    data = encodeURI(csv)
    link = document.createElement('a')
    link.setAttribute('href', data)
    let customerData = _.find(this.props.allCustomerList, {
      customer_id: this.props.lastCustomer
    })
    if (customerData) {
      link.setAttribute(
        'download',
        `${customerData.customer_name}_${new Date().getTime()}.xls`
      )
    } else {
      link.setAttribute('download', `Report_${new Date().getTime()}.xls`)
    }
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}
export default ReportsPM
