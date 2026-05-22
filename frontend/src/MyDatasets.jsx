import {
  useEffect,
  useState
} from 'react';

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
    <div
      style={{
        padding: '40px'
      }}
    >
      <h1>
        My Datasets
      </h1>

      <div
        style={{
          display: 'grid',

          gridTemplateColumns:
            'repeat(auto-fill, minmax(300px, 1fr))',

          gap: '20px',

          marginTop: '30px'
        }}
      >
        {datasets.map(
          (dataset) => (

          <div
            key={dataset.id}

            style={{
              background: 'white',

              padding: '20px',

              borderRadius: '10px',

              boxShadow:
                '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <h2>
              {dataset.title}
            </h2>

            <p>
              {dataset.description}
            </p>

            <p>
              <strong>
                Category:
              </strong>

              {' '}

              {dataset.category}
            </p>

            <p>
              <strong>
                File:
              </strong>

              {' '}

              {dataset.filename}
            </p>

            <button

              onClick={() =>
                handleDelete(
                  dataset.id
                )
              }

              style={{
                marginTop: '15px',

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

              onClick={() =>
                handleEdit(dataset)
              }

              style={{
                marginTop: '10px',

                marginLeft: '10px',

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

                  onChange={(e) =>
                    setEditTitle(
                      e.target.value
                    )
                  }

                  placeholder="Title"
                />

                <textarea

                  value={editDescription}

                  onChange={(e) =>
                    setEditDescription(
                      e.target.value
                    )
                  }

                  placeholder="Description"
                />

                <input

                  value={editCategory}

                  onChange={(e) =>
                    setEditCategory(
                      e.target.value
                    )
                  }

                  placeholder="Category"
                />

                <button

                  onClick={() =>
                    handleSave(
                      dataset.id
                    )
                  }

                  style={{
                    padding: '10px',

                    background: 'green',

                    color: 'white',

                    border: 'none',

                    borderRadius: '8px'
                  }}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyDatasets;