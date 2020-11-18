import { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom'
import AuthContext from '../context/auth/AuthContextProvider';

// Take children and rest of props from wrapper component
function PrivateRoute({ children, ...rest }) {
  const { AuthState } = useContext(AuthContext);
  // Check if user is logged in 
  // If so return the child component the private route is wrapping,
  // Else redirect to login page
  // * render prop will be ran every time, so it will always check if user is authenticated *
  return (
    <Route {...rest} render={() => {
      const result = AuthState.user ? children : <Redirect to="/login" />
      return result
    }} />
  )
}

export default PrivateRoute
