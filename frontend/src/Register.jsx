import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

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
            name,
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

        navigate('/');

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);

      alert('Server error');
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
        onSubmit={handleRegister}
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '10px',
          width: '300px'
        }}
      >
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
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
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;