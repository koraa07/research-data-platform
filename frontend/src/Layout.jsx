import {
  Link,
  Outlet
} from 'react-router-dom';

function Layout() {

  return (
    <div
      style={{
        display: 'flex',

        minHeight: '100vh',

        background: '#f5f7fb'
      }}
    >
      <div
        style={{
          width: '250px',

          background: '#111827',

          color: 'white',

          padding: '30px'
        }}
      >
        <h2>
          Research Platform
        </h2>

        <div
          style={{
            marginTop: '40px',

            display: 'flex',

            flexDirection: 'column',

            gap: '20px'
          }}
        >
          <Link
            to="/dashboard"

            style={{
              color: 'white',

              textDecoration: 'none'
            }}
          >
            Dashboard
          </Link>

          <Link
            to="/datasets"

            style={{
              color: 'white',

              textDecoration: 'none'
            }}
          >
            Datasets
          </Link>

          <Link
            to="/my-datasets"

            style={{
              color: 'white',

              textDecoration: 'none'
            }}
          >
            My Datasets
          </Link>

          <Link
            to="/uploads"

            style={{
              color: 'white',

              textDecoration: 'none'
            }}
          >
            Upload
          </Link>

          <Link
            to="/projects"

            style={{
              color: 'white',

              textDecoration: 'none'
            }}
          >
            Projects
          </Link>

          <Link
  to="/settings"

  style={{
    color: 'white',
    textDecoration: 'none'
  }}
>
  Settings
</Link>
        </div>
      </div>

      <div
        style={{
          flex: 1
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;