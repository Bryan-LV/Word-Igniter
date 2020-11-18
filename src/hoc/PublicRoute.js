import { Redirect, Route } from 'react-router-dom'

// Take children and rest of props from wrapper component
function PublicRoute({ children, user, ...rest }) {

  // if user is logged in don't show login or register pages
  if (user && rest.path === '/login') {
    return <Redirect {...rest} to="/" />
  }
  if (user && rest.path === '/register') {
    return <Redirect {...rest} to="/" />
  }

  return <Route {...rest} render={() => children} />
}

export default PublicRoute
