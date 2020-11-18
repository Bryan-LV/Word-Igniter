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
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Switch>
              <PublicRoute path="/login" user={AuthState.user} exact>
                <Login />
              </PublicRoute>

              <PublicRoute path="/register" user={AuthState.user} exact>
                <Register />
              </PublicRoute>

              <PrivateRoute path="/" exact>
                <Dashboard />
              </PrivateRoute>

              <PrivateRoute path="/quizzes" exact>
                <Quizzes />
              </PrivateRoute>

              <PublicRoute user={AuthState.user} path="/*" >
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
