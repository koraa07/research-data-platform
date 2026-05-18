import { useNavigate } from 'react-router-dom';

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
        padding: '40px',
        background: '#f5f5f5',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between',
          alignItems: 'center'
        }}
      >
        <h1>
          Research Dashboard
        </h1>

        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

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
          <h3>Research Projects</h3>

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
  );
}

export default Dashboard;