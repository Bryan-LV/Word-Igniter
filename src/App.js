import { lazy, Suspense } from 'react'
import { Route, BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/layout/Loader';
import Navbar from './components/layout/Navbar';
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const Quizzes = lazy(() => import('./components/quizzes/Quizzes'));
const Login = lazy(() => import('./components/login/Login'));
const Register = lazy(() => import('./components/login/Register'));

function App() {
  return (
    <div className="text-gray-800">
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Route path="/login" exact>
              <Login />
            </Route>

            <Route path="/register" exact>
              <Register />
            </Route>

            <Route path="/" exact>
              <Dashboard isAuth={true} />
            </Route>

            <Route path="/quizzes" exact>
              <Quizzes isAuth={true} />
            </Route>

          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
