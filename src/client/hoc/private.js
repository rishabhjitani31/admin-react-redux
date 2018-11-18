import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
const Private = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!localStorage.getItem('sessionToken')) {
        return (
          <Redirect
            to={{
              pathname: '/login'
            }}
          />
        )
      } else {
        return <Component {...props} />
      }
    }}
  />
)
Private.propTypes = {
  component: PropTypes.func
}
export default Private
