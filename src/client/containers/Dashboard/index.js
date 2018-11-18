import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Radio } from 'antd'
import presenter from 'hoc/presenter'
import DashboardPM from './dashboardPM'
import ContainerHeader from 'components/ContainerHeader'
import * as dashboardActions from 'actions/dashboard'
import * as workorderActions from 'actions/workorder'
import ContainerLayout from 'components/ContainerLayout'
import { getLabelData, getTicketDataByType } from 'selectors/dashboard'
import LineChart from './lineChart'
import BarChart from './barChart'
import TableContainer from 'components/TableContainer'
import getColumnData from './columns'
import './dashboard.scss'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

const Dashboard = props => {
  return (
    <div className="dashboard-layout">
      <ContainerHeader title="Dashboard" />
      <ContainerLayout>
        <div className="alignment-flex">
          <div className="chartCard">
            <Card className=" chartCard-first">
              <h3 className="chartCard-title">New Tickets </h3>
              <p className="chartCard-amount">
                {props.ticketDataByType.created.reduce((a, b) => a + b, 0)}
              </p>
            </Card>
          </div>
          <div className="chartCard">
            <Card className="chartCard-second">
              <h3 className="chartCard-title">Pending Tickets </h3>
              <p className="chartCard-amount">
                {props.ticketDataByType.pending.reduce((a, b) => a + b, 0)}
              </p>
            </Card>
          </div>
          <div className="chartCard">
            <Card className="chartCard-third">
              <h3 className="chartCard-title">Completed Tickets </h3>
              <p className="chartCard-amount">
                {props.ticketDataByType.completed.reduce((a, b) => a + b, 0)}
              </p>
            </Card>
          </div>
          <div className="chartCard">
            <Card className="chartCard-forth">
              <h3 className="chartCard-title">Verified Tickets </h3>
              <p className="chartCard-amount">
                {props.ticketDataByType.verified.reduce((a, b) => a + b, 0)}
              </p>
            </Card>
          </div>
        </div>
        <RadioGroup defaultValue="lineChart" onChange={props.changeChartView}>
          <RadioButton value="lineChart">Line Chart</RadioButton>
          <RadioButton value="barChart">Bar Chart</RadioButton>
        </RadioGroup>
        <Card>
          {props.chartToggle === 'barChart' ? (
            <BarChart
              labels={props.labels}
              completed={props.ticketDataByType.completed}
              verified={props.ticketDataByType.verified}
              pending={props.ticketDataByType.pending}
              created={props.ticketDataByType.created}
            />
          ) : (
            <LineChart
              labels={props.labels}
              completed={props.ticketDataByType.completed}
              verified={props.ticketDataByType.verified}
              pending={props.ticketDataByType.pending}
              created={props.ticketDataByType.created}
            />
          )}
        </Card>
        <TableContainer
          tableProps={{
            dataSource: props.workorderlist && props.workorderlist.slice(0, 10),
            columns: getColumnData(),
            rowKey: record => record.issue_id,
            loading: props.isFetching,
            pagination: false,
            onRow: props.pm.onRowClick
          }}
        />
      </ContainerLayout>
    </div>
  )
}

export default withRouter(
  presenter(
    store => ({
      chartToggle: store.dashboard.chartToggle,
      labels: getLabelData(store.dashboard.chartData),
      ticketDataByType: getTicketDataByType(store.dashboard.chartData),
      isFetching: store.dashboard.isFetching,
      workorderlist: store.workorder.workorderlist
    }),
    { ...dashboardActions, ...workorderActions }
  )(DashboardPM, Dashboard)
)
