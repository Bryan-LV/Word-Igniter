import { createContext, useReducer, useEffect } from 'react';
import { AuthState as State } from './AuthState';
import AuthReducer from './AuthReducer';
import AuthTypes from './AuthTypes';
import { auth } from '../../firebase';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [AuthState, AuthDispatch] = useReducer(AuthReducer, State);

  // Create auth actions to call to dispatch reducer
  const AuthActions = {
    login(user) {
      return AuthDispatch({ type: AuthTypes.SIGN_IN, payload: user });
    },
    logout() {
      return AuthDispatch(({ type: AuthTypes.SIGN_OUT }));
    }
  }

  useEffect(() => {
    // check if user is signed in
    const unsubcribe = auth.onAuthStateChanged(user => {
      if (user) {
        AuthActions.login(user.email);
      }
    })
    return unsubcribe
  }, [])

  return (
    <AuthContext.Provider value={{ AuthState, AuthActions }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext;
