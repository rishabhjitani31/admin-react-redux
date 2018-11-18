import React from 'react'
import { Card, Table, Input, Pagination } from 'antd'
import './index.scss'

const Search = Input.Search

export default class TableContainer extends React.Component {
  state = {
    dataSource: [],
    filterValue: ''
  }
  componentDidMount() {
    this.setState({ dataSource: this.props.tableProps.dataSource })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tableProps.dataSource !== this.props.tableProps.dataSource) {
      this.setState({ dataSource: this.props.tableProps.dataSource })
    }
  }

  setFilterValue(value) {
    this.setState({ filterValue: value })
  }

  getDataSource = () => {
    let { filterValue: value } = this.state
    if (!value) {
      return this.props.tableProps.dataSource
    } else {
      return this.props.tableProps.dataSource.filter(item => {
        for (let key in item) {
          if (this.props.filterByFields.includes(key)) {
            let v = item[key] && item[key].toString().toLowerCase()
            if (v && v.indexOf(value.toLowerCase()) !== -1) {
              return true
            }
          }
        }
        return false
      })
    }
  }

  render() {
    let tableProps = {
      ...this.props.tableProps,
      dataSource: this.getDataSource()
    }
    return (
      <Card className="table-container">
        <div className="flex">
          {this.props.filterByFields.length > 0 && (
            <Search
              id="input-search"
              placeholder="Search"
              onChange={e => this.setFilterValue(e.target.value)}
              className="search-filter"
              value={this.state.filterValue}
            />
          )}
          {this.props.extra}
        </div>
        {this.props.paginationProps && (
          <div className="pagination-view">
            <Pagination {...this.props.paginationProps} />
          </div>
        )}
        <Table {...tableProps} bordered={true} scroll={{ x: 812 }} />
        {this.props.paginationProps && (
          <div className="pagination-view">
            <Pagination {...this.props.paginationProps} />
          </div>
        )}
      </Card>
    )
  }
}
TableContainer.defaultProps = {
  tableProps: { dataSource: [], columns: [] },
  filterByFields: []
}
