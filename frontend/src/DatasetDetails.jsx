import {
  useEffect,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import axios from 'axios';

function DatasetDetails() {

  const { id } = useParams();

  const [dataset, setDataset] =
    useState(null);

  useEffect(() => {

    fetchDataset();

  }, []);

  const fetchDataset = async () => {

    try {

      const response =
        await axios.get(
          `http://localhost:5000/api/datasets/${id}`
        );

      setDataset(
        response.data.dataset
      );

    } catch (error) {

      console.error(error);
    }
  };

  if (!dataset) {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        padding: '40px',
        background: '#f5f5f5',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '10px',
          maxWidth: '700px',
          boxShadow:
            '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <h1>
          {dataset.title}
        </h1>

        <p
          style={{
            marginTop: '20px'
          }}
        >
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

        <p>
          <strong>
            Uploaded:
          </strong>

          {' '}

          {new Date(
            dataset.createdAt
          ).toLocaleDateString()}
        </p>

        <a
          href={
            `http://localhost:5000/uploads/${dataset.filename}`
          }

          download

          style={{
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 20px',
            background: '#2563eb',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px'
          }}
        >
          Download Dataset
        </a>
      </div>
    </div>
  );
}

export default DatasetDetails;