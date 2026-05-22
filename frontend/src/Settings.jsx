import {
  useState
} from 'react';

import toast from 'react-hot-toast';

import axios from 'axios';

function Settings() {

  const user =
    JSON.parse(
      localStorage.getItem(
        'user'
      )
    );

  const [name, setName] =
    useState(user.name);

  const [currentPassword,
    setCurrentPassword] =
      useState('');

  const [newPassword,
    setNewPassword] =
      useState('');

  const handleSave =
  async () => {

    try {

      const response =
        await axios.put(

          `http://localhost:5000/api/settings/${user.id}`,

          {
            name,

            currentPassword,

            newPassword
          }
        );

      localStorage.setItem(

        'user',

        JSON.stringify(
          response.data.user
        )
      );

      toast.success(
        'Settings updated'
      );

    } catch (error) {

      console.log(error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {

        toast.error(
          error.response.data.message
        );

      } else {

        toast.error(
          'Update failed'
        );
      }
    }
  };

  const handleLogout =
    () => {

      localStorage.clear();

      window.location.href = '/';
    };

  return (
    <div
      style={{
        padding: '40px'
      }}
    >
      <h1>
        Settings
      </h1>

      <div
        style={{
          background: 'white',

          padding: '30px',

          borderRadius: '12px',

          maxWidth: '500px',

          marginTop: '30px'
        }}
      >
        <div
          style={{
            display: 'flex',

            flexDirection: 'column',

            gap: '15px'
          }}
        >
          <input

            value={name}

            onChange={(e) =>
              setName(
                e.target.value
              )
            }

            placeholder="Name"

            style={{
              padding: '12px'
            }}
          />

          <input

            type="password"

            value={currentPassword}

            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
            }

            placeholder="Current Password"

            style={{
              padding: '12px'
            }}
          />

          <input

            type="password"

            value={newPassword}

            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }

            placeholder="New Password"

            style={{
              padding: '12px'
            }}
          />

          <button

            onClick={handleSave}

            style={{
              padding: '12px',

              background: '#2563eb',

              color: 'white',

              border: 'none',

              borderRadius: '8px'
            }}
          >
            Save Settings
          </button>

          <button

            onClick={handleLogout}

            style={{
              padding: '12px',

              background: '#dc2626',

              color: 'white',

              border: 'none',

              borderRadius: '8px'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;