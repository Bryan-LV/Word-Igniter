import React from 'react'
import { Redirect } from 'react-router-dom'

function WithAuth(OriginalComp) {

  function WithAuthComponent(props) {
    const isAuthenticated = () => props.isAuth;
    return (
      <>
        {isAuthenticated() ? < OriginalComp {...props} /> : <Redirect to="/login" />}
      </>
    )
  }

  return WithAuthComponent
}

export default WithAuth
