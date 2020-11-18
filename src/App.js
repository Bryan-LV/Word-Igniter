import { lazy, Suspense, useContext } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import ErrorBoundary from './components/layout/ErrorBoundary';
import Loader from './components/layout/Loader';
import Navbar from './components/layout/Navbar';
import AuthContext from './context/auth/AuthContextProvider';
import PrivateRoute from './hoc/PrivateRoute';
import PublicRoute from './hoc/PublicRoute';
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Quizzes = lazy(() => import('./components/quizzes/Quizzes'));
const Login = lazy(() => import('./components/login/Login'));
const Register = lazy(() => import('./components/login/Register'));

function App() {
  const { AuthState } = useContext(AuthContext);
  return (
    <div className="text-gray-800">
      <BrowserRouter>
        <Navbar isAuth={AuthState.user} />
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Switch>
              <PublicRoute path="/login" isAuth={AuthState.user} exact>
                <Login />
              </PublicRoute>

              <PublicRoute path="/register" isAuth={AuthState.user} exact>
                <Register />
              </PublicRoute>

              <PrivateRoute path="/" isAuth={AuthState.user} exact>
                <Dashboard />
              </PrivateRoute>

              <PrivateRoute path="/quizzes" isAuth={AuthState.user} exact>
                <Quizzes />
              </PrivateRoute>

              <PublicRoute isAuth={AuthState.user} path="/*" >
                <Login />
              </PublicRoute>

            </Switch>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
