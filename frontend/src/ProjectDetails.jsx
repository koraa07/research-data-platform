import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    fetchProject();
    fetchDatasets();
  }, [id]);



const API = import.meta.env.VITE_API_URL;

const fetchProject = async () => {
  try {
    const response = await axios.get(
      `${API}/api/projects/${id}`
    );

    setProject(response.data.project);
  } catch (error) {
    console.error(error);
    toast.error('Project not found');
  }
};

const fetchDatasets = async () => {
  try {
    const response = await axios.get(
      `${API}/api/datasets/project/${id}`
    );

    setDatasets(response.data.datasets);
  } catch (error) {
    console.error(error);
  }
};

  if (!project) {
    return (
      <h2 style={{ padding: '40px' }}>
        Loading...
      </h2>
    );
  }

  return (
    <div style={{ padding: '40px' }}>
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px'
        }}
      >
        <h1>{project.title}</h1>

        <p
          style={{
            marginTop: '15px',
            color: '#555'
          }}
        >
          {project.description}
        </p>
      </div>

      <div
        style={{
          marginTop: '40px'
        }}
      >
        <h2>Datasets</h2>

        {datasets.length === 0 ? (
          <p>No datasets in this project</p>
        ) : (
          datasets.map((dataset) => (
            <div
              key={dataset.id}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                marginTop: '15px'
              }}
            >
              <Link
                to={`/datasets/${dataset.id}`}
                style={{
                  textDecoration: 'none',
                  color: '#2563eb',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                {dataset.title}
              </Link>

              <p
                style={{
                  marginTop: '10px'
                }}
              >
                {dataset.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
