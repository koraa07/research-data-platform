import {
  useEffect,
  useState
} from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';

function MyDatasets() {

  const [datasets, setDatasets] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [editTitle, setEditTitle] =
    useState('');

  const [editDescription,
    setEditDescription] =
      useState('');

  const [editCategory,
    setEditCategory] =
      useState('');

  useEffect(() => {

    fetchMyDatasets();

  }, []);

  const fetchMyDatasets =
    async () => {

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              'user'
            )
          );

        const response =
          await axios.get(
            `http://localhost:5000/api/datasets/user/${user.id}`
          );

        setDatasets(
          response.data.datasets
        );

      } catch (error) {

        console.error(error);
      }
    };

  const handleDelete =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/datasets/${id}`
        );

        setDatasets((prev) =>

          prev.filter(
            (dataset) =>
              dataset.id !== id
          )
        );

      } catch (error) {

        console.error(error);
      }
    };

  const handleEdit =
    (dataset) => {

      setEditingId(
        dataset.id
      );

      setEditTitle(
        dataset.title
      );

      setEditDescription(
        dataset.description
      );

      setEditCategory(
        dataset.category
      );
    };

  const handleSave =
    async (id) => {

      try {

        const response =
          await axios.put(

            `http://localhost:5000/api/datasets/${id}`,

            {
              title:
                editTitle,

              description:
                editDescription,

              category:
                editCategory
            }
          );

        setDatasets((prev) =>

          prev.map((dataset) =>

            dataset.id === id

              ? response.data.dataset

              : dataset
          )
        );

        setEditingId(null);

      } catch (error) {

        console.error(error);
      }
    };

  return (
    <div className="page-content">
      <div className="section-header" style={{ marginBottom: '24px' }}>
        <div>
          <h1>My Datasets</h1>
          <p className="text-muted">
            Manage your datasets and quickly add new research assets.
          </p>
        </div>
        {datasets.length > 0 && (
          <Link to="/uploads" className="btn btn-primary">
            Upload dataset
          </Link>
        )}
      </div>

      {datasets.length === 0 ? (
        <div className="empty-state-card">
          <h2>Upload your first dataset</h2>
          <p>
            You don’t have any datasets yet. Add your first one to organize projects, categories,
            and files in your research workspace.
          </p>
          <Link to="/uploads" className="btn btn-primary">
            Upload dataset
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}
        >
          {datasets.map((dataset) => (
            <div
              key={dataset.id}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <h2>{dataset.title}</h2>

              <p>{dataset.description}</p>

              <p>
                <strong>Category:</strong> {dataset.category}
              </p>

              <p>
                <strong>File:</strong> {dataset.filename}
              </p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '15px' }}>
                <button
                  onClick={() => handleDelete(dataset.id)}
                  style={{
                    padding: '10px',
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>

                <button
                  onClick={() => handleEdit(dataset)}
                  style={{
                    padding: '10px',
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
              </div>

              {editingId === dataset.id && (
                <div
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Title"
                    className="input-field"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                    className="input-field"
                  />

                  <input
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    placeholder="Category"
                    className="input-field"
                  />

                  <button
                    onClick={() => handleSave(dataset.id)}
                    className="btn btn-primary"
                    style={{ width: 'fit-content' }}
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDatasets;