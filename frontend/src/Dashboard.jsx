import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');
  };

  return (
    <div
      style={{
        padding: '40px'
      }}
    >
      <h1>Dashboard</h1>

      <p>
        You are logged in 🔥
      </p>

      <button
        onClick={handleLogout}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;