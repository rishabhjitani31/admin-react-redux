import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {
  state = { hasError: false }

  /**
   * @param {*} error
   * @param {*} info
   */
  componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info })
  }

  /**
   *
   */
  render() {
    const { hasError, error } = this.state
    if (hasError) {
      return (
        <div>
          <h1 style={{ color: 'red' }}>Error: {error.message}</h1>
          <h4 style={{ color: 'red' }}>Stack: {error.stack}</h4>
        </div>
      )
    }

    return this.props.children
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.object
}

export default ErrorBoundary
