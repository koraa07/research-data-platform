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

  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchProjects();
    fetchDatasets();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/users/${userId}`
      );
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/projects/user/${userId}`
      );
      setProjects(res.data.projects);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDatasets = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/datasets/user/${userId}`
      );
      setDatasets(res.data.datasets);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="page-content">
        <h1 className="page-title">Loading user profile...</h1>
      </div>
    );
  }

  return (
    <div className="page-content profile-page">
      <h1 className="page-title">{user.name}</h1>

      <div className="profile-header">
        <div className="profile-banner">
          <div className="profile-avatar">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        <div className="profile-metrics">
          <div className="profile-stat-box">
            <h3>Projects</h3>
            <h1>{projects.length}</h1>
          </div>
          <div className="profile-stat-box">
            <h3>Datasets</h3>
            <h1>{datasets.length}</h1>
          </div>
        </div>
      </div>

      <div className="section-title">Projects</div>
      {projects.length === 0 ? (
        <div className="empty-state-card">
          <h2>No projects yet</h2>
          <p>This user has not shared any projects yet.</p>
        </div>
      ) : (
        <div className="section-grid">
          {projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`} className="result-link">
              <div className="card">
                <h2 className="card-title">{project.title}</h2>
                <p>{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="section-title">Datasets</div>
      {datasets.length === 0 ? (
        <div className="empty-state-card">
          <h2>No datasets yet</h2>
          <p>This user has not uploaded any datasets yet.</p>
        </div>
      ) : (
        <div className="section-grid">
          {datasets.map((dataset) => (
            <Link key={dataset.id} to={`/datasets/${dataset.id}`} className="result-link">
              <div className="card">
                <h2 className="card-title">{dataset.title}</h2>
                <p>{dataset.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;