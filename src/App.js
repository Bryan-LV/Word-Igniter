import { lazy, Suspense, useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorBoundary from './components/layout/ErrorBoundary';
import Loader from './components/layout/Loader';
import Navbar from './components/layout/Navbar';
import Redirector from './components/layout/Redirector';
import AuthContext from './context/auth/AuthContextProvider';
import PublicRoute from './hoc/PublicRoute';
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Quizzes = lazy(() => import('./components/quizzes/Quizzes'));
const Login = lazy(() => import('./components/login/Login'));
const Register = lazy(() => import('./components/login/Register'));

function App() {
  const { AuthState, AuthActions } = useContext(AuthContext);

  return (
    <div className="text-gray-800">
      <BrowserRouter>
        <Navbar isAuth={AuthState.user} logout={AuthActions.logout} />
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Switch>

              <PublicRoute path="/login" isAuth={AuthState.user} exact>
                <Login />
              </PublicRoute>

              <PublicRoute path="/register" isAuth={AuthState.user} exact>
                <Register />
              </PublicRoute>

              <Route path="/" exact render={(props) => {
                return AuthState.user ? <Dashboard {...props} /> : <Redirector path="/login" isAuth={AuthState.user} />;
              }} />

              <Route path="/quizzes" exact render={props => {
                return AuthState.user ? <Quizzes {...props} /> : <Redirector path="/login" isAuth={AuthState.user} />;
              }} />

            </Switch>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
