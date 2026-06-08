import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRequirements.test(password)) {
      setError(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol'
      );
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify({
            name: username,
            email,
            password
          })
        }
      );

      const data =
        await response.json();

      console.log(data);

      if (data.success) {
        alert('Registration successful');

        navigate('/login');

      } else {
        setError(data.message);
      }

    } catch (error) {
      console.error(error);

      alert('Server error');
    }
  };

  return (
    <div className="auth-shell">
      <form onSubmit={handleRegister} className="auth-panel">

        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError('');
          }}
          className="input-field"
          style={{ marginBottom: '15px' }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;