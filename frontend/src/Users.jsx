import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import {
  Link
} from 'react-router-dom';

function Users() {

  const [users,
    setUsers] =
      useState([]);

  const [search,
    setSearch] =
      useState('');

  useEffect(() => {

    fetchUsers();

  }, []);

  const fetchUsers =
    async () => {

      try {

        const response =
          await axios.get(

            'http://localhost:5000/api/users'
          );

        setUsers(
          response.data.users
        );

      } catch (error) {

        console.error(error);
      }
    };

  const filteredUsers =
    users.filter((user) =>

      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <div
      style={{
        padding: '40px'
      }}
    >
      <h1>
        Users
      </h1>

      <input

        type="text"

        placeholder="Search user..."

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

        style={{
          padding: '12px',
          width: '300px',
          marginTop: '20px'
        }}
      />

      <div
        style={{
          display: 'grid',

          gridTemplateColumns:
            'repeat(auto-fill, minmax(280px, 1fr))',

          gap: '20px',

          marginTop: '30px'
        }}
      >
        {filteredUsers.map(
          (user) => (

            <Link

              key={user.id}

              to={`/profile/${user.id}`}

              style={{
                textDecoration:
                  'none',

                color:
                  'inherit'
              }}
            >
              <div
                style={{
                  background:
                    'white',

                  padding:
                    '20px',

                  borderRadius:
                    '12px',

                  boxShadow:
                    '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <h2>
                  {user.name}
                </h2>

                <p>
                  {user.email}
                </p>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default Users;