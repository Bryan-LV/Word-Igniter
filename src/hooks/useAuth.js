import { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContextProvider'

function useAuth() {
  const { AuthState } = useContext(AuthContext);
  const history = useHistory();
  useEffect(function () {
    if (!AuthState.user) {
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    }
  }, [AuthState])
}

export default useAuth
