import { Redirect, Route } from 'react-router-dom'

// Take children and rest of props from wrapper component
function PrivateRoute({ children, isAuth, ...rest }) {
  // Check if user is logged in 
  // If so return the child component the private route is wrapping,
  // Else redirect to login page
  // * render prop will be ran every time, so it will always check if user is authenticated *
  return (
    <Route {...rest} render={() => {
      const result = isAuth ? children : <Redirect to="/login" />
      return result
    }} />
  )
}

export default PrivateRoute
