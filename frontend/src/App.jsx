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

import DatasetDetails
  from './DatasetDetails';

import MyDatasets
  from './MyDatasets';

import Layout
  from './Layout';

import Settings
  from './Settings';

function LoginPage() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
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

                email,

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

          alert(
            data.message
          );
        }

      } catch (error) {

        console.error(error);

        alert(
          'Server error'
        );
      }
    };

  return (
    <div
      style={{
        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        height: '100vh',

        background: '#f5f5f5'
      }}
    >
      <form

        onSubmit={
          handleLogin
        }

        style={{
          background: 'white',

          padding: '40px',

          borderRadius: '10px',

          width: '300px'
        }}
      >
        <h2>
          Login
        </h2>

        <input

          type="email"

          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          style={{
            width: '100%',

            padding: '10px',

            marginBottom: '15px'
          }}
        />

        <input

          type="password"

          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }

          style={{
            width: '100%',

            padding: '10px',

            marginBottom: '15px'
          }}
        />

        <button

          type="submit"

          style={{
            width: '100%',

            padding: '10px'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"

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

        </Route>

      </Routes>

      <Toaster />

    </BrowserRouter>
  );
}

export default App;