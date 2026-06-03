import {
  useEffect,
  useState
} from 'react';

import {
  useParams,
  Link
} from 'react-router-dom';

import axios from 'axios';

function UserProfile() {

  const { userId } =
    useParams();

  const [user,
    setUser] =
      useState(null);

  const [projects,
    setProjects] =
      useState([]);

  const [datasets,
    setDatasets] =
      useState([]);

  useEffect(() => {

    fetchUser();

    fetchProjects();

    fetchDatasets();

  }, [userId]);

  const fetchUser =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/users/${userId}`
          );

        setUser(
          response.data.user
        );

      } catch (error) {

        console.error(error);
      }
    };

  const fetchProjects =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/projects/user/${userId}`
          );

        setProjects(
          response.data.projects
        );

      } catch (error) {

        console.error(error);
      }
    };

  const fetchDatasets =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/datasets/user/${userId}`
          );

        setDatasets(
          response.data.datasets
        );

      } catch (error) {

        console.error(error);
      }
    };

  if (!user) {

    return (
      <h2
        style={{
          padding: '40px'
        }}
      >
        Loading...
      </h2>
    );
  }
console.log(projects)
  return (
    <div
      style={{
        padding: '40px'
      }}
    >
      <h1>
        {user.name}
      </h1>

      <p>
        {user.email}
      </p>

      <h2
        style={{
          marginTop: '40px'
        }}
      >
        Projects
      </h2>

      {projects.map(
        (project) => (

          <div
            key={project.id}
            style={{
              background:
                'white',
              padding:
                '15px',
              marginTop:
                '10px',
              borderRadius:
                '10px'
            }}
          >
            <Link
              to={`/projects/${project.id}`}
            >
              {project.title}
            </Link>
          </div>
        )
      )}

      <h2
        style={{
          marginTop: '40px'
        }}
      >
        Datasets
      </h2>

      {datasets.map(
        (dataset) => (

          <div
            key={dataset.id}
            style={{
              background:
                'white',
              padding:
                '15px',
              marginTop:
                '10px',
              borderRadius:
                '10px'
            }}
          >
            <Link
              to={`/datasets/${dataset.id}`}
            >
              {dataset.title}
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default UserProfile;