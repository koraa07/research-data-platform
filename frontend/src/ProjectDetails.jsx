import {
  useEffect,
  useState
} from 'react';

import {
  useParams
} from 'react-router-dom';

import axios from 'axios';

function ProjectDetails() {

  const { id } =
    useParams();

  const [datasets,
    setDatasets] =
      useState([]);

  useEffect(() => {

    fetchDatasets();

  }, []);

  const fetchDatasets =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/datasets/project/${id}`
          );

        setDatasets(
          response.data.datasets
        );

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
        Project Datasets
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

                borderRadius: '12px',

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
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;