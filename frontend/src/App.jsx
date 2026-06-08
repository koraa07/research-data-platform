import { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import { Toaster }
  from 'react-hot-toast';

import Dashboard
  from './Dashboard';

import Register
  from './Register';

import ProtectedRoute
  from './ProtectedRoute';

import Projects
  from './Projects';

import Uploads
  from './Uploads';

import Datasets
  from './Datasets';

import Favorites
  from './Favorites';

import Forum
  from './Forum';

import ForumThread
  from './ForumThread';

import DatasetDetails
  from './DatasetDetails';

import MyDatasets
  from './MyDatasets';

import Layout
  from './Layout';
import { LanguageProvider } from './LanguageContext';

import Settings
  from './Settings';

import ProjectDetails
  from './ProjectDetails';

import Users from './Users';

import UserProfile from './UserProfile';

import Profile from './Profile';



import LandingPage
  from './LandingPage';

function LoginPage() {

  const navigate =
    useNavigate();

  const [identifier, setIdentifier] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const handleLogin =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await fetch(

            'http://localhost:5000/api/auth/login',

            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json'
              },

              body: JSON.stringify({

                email: identifier,

                password
              })
            }
          );

        const data =
          await response.json();

        console.log(data);

        if (data.success) {

          localStorage.setItem(
            'token',
            data.token
          );

          localStorage.setItem(

            'user',

            JSON.stringify(
              data.user
            )
          );

          navigate(
            '/dashboard'
          );

        } else {
          setError(data.message);
        }

      } catch (error) {

        console.error(error);

        alert(
          'Server error'
        );
      }
    };

  return (
    <div className="auth-shell">
      <form onSubmit={handleLogin} className="auth-panel">

        <h2>
          Login
        </h2>

        <input
          type="text"
          placeholder="Email or username"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            setError('');
          }}
          className="input-field"
          style={{ marginBottom: '15px' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          className="input-field"
          style={{ marginBottom: '15px' }}
        />

        {error && (
          <div style={{ color: '#E65F2B', marginBottom: '15px' }}>
            {error}
          </div>
        )}


        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Login
        </button>

        <div
          style={{
            marginTop: '15px',
            textAlign: 'center'
          }}
        >
          <span
            style={{
              color: '#6b7280'
            }}
          >
            No account?
          </span>

          {' '}

          <button
            type="button"
            onClick={() => navigate('/register')}
            className="btn btn-ghost"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

function App() {

  return (
    <LanguageProvider>
      <BrowserRouter>

        <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/login"

          element={
            <LoginPage />
          }
        />

        <Route
          path="/register"

          element={
            <Register />
          }
        />

        <Route

          element={

            <ProtectedRoute>

              <Layout />

            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"

            element={
              <Dashboard />
            }
          />

          <Route
            path="/datasets"

            element={
              <Datasets />
            }
          />

          <Route
            path="/my-datasets"

            element={
              <MyDatasets />
            }
          />

          <Route
            path="/uploads"

            element={
              <Uploads />
            }
          />

          <Route
            path="/projects"

            element={
              <Projects />
            }
          />

          <Route
            path="/forum"

            element={
              <Forum />
            }
          />

          <Route
            path="/forum/:id"

            element={
              <ForumThread />
            }
          />

          <Route
            path="/favorites/:type"
            element={
              <Favorites />
            }
          />

          <Route
            path="/settings"

            element={
              <Settings />
            }
          />

          <Route
            path="/datasets/:id"

            element={
              <DatasetDetails />
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            }
          />

        </Route>
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />


      </Routes>

      <Toaster />

    </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;