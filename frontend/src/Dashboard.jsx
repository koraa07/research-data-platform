import {
  Link,
  useNavigate
} from 'react-router-dom';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function Dashboard() {
  const navigate = useNavigate();

  const data = [
    { month: 'Jan', users: 30 },
    { month: 'Feb', users: 45 },
    { month: 'Mar', users: 60 },
    { month: 'Apr', users: 40 },
    { month: 'May', users: 90 }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f5f5f5'
      }}
    >

      {/* SIDEBAR */}

      <div
        style={{
          width: '250px',
          background: '#1e293b',
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
            to="/projects"
            style={{
              color: 'white',
              textDecoration: 'none'
            }}
          >
            Projects
          </Link>

          <Link
            to="/analytics"
            style={{
              color: 'white',
              textDecoration: 'none'
            }}
          >
            Analytics
          </Link>

          <Link
            to="/uploads"
            style={{
              color: 'white',
              textDecoration: 'none'
            }}
          >
            Uploads
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
          
          <Link
  to="/datasets"
  style={{
    color: 'white',
    textDecoration: 'none'
  }}
>
  Datasets
</Link>

        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: '50px',
            padding: '10px',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}

      <div
        style={{
          flex: 1,
          padding: '40px'
        }}
      >
        <h1>
          Dashboard
        </h1>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '30px'
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              flex: 1
            }}
          >
            <h3>Total Users</h3>

            <h1>245</h1>
          </div>

          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              flex: 1
            }}
          >
            <h3>Projects</h3>

            <h1>18</h1>
          </div>

          <div
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
              flex: 1
            }}
          >
            <h3>Uploads</h3>

            <h1>120</h1>
          </div>
        </div>

        <div
          style={{
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '40px',
            height: '400px'
          }}
        >
          <h2>
            User Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height="90%"
          >
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="users"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;