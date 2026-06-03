import {
  useEffect,
  useState
} from 'react';

import {
  Link
} from 'react-router-dom';

import axios from 'axios';

function Datasets() {

  const [datasets,
    setDatasets] =
      useState([]);

  const [search,
    setSearch] =
      useState('');

  const [category,
    setCategory] =
      useState('');

  useEffect(() => {

    fetchDatasets();

  }, []);

  const fetchDatasets =
    async () => {

      try {

        const response =
          await axios.get(
            'http://localhost:5000/api/datasets'
          );

        setDatasets(
          response.data.datasets
        );

      } catch (error) {

        console.error(error);
      }
    };

  const filteredDatasets =
    datasets.filter(
      (dataset) => {

        const matchesSearch =
          dataset.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCategory =
          category === '' ||
          dataset.category === category;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );

  const categories =
    [...new Set(
      datasets.map(
        (dataset) =>
          dataset.category
      )
    )];

  return (
    <div
      style={{
        padding: '40px'
      }}
    >
      <h1>
        Research Datasets
      </h1>

      <div
        style={{
          display: 'flex',

          gap: '20px',

          marginTop: '20px',

          marginBottom: '30px'
        }}
      >
        <input

          type="text"

          placeholder="Search datasets..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          style={{
            padding: '10px',

            width: '300px'
          }}
        />

        <select

          value={category}

          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }

          style={{
            padding: '10px'
          }}
        >
          <option value="">
            All Categories
          </option>

          {categories.map(
            (cat) => (

              <option

                key={cat}

                value={cat}
              >
                {cat}
              </option>
            )
          )}
        </select>
      </div>

      <div
        style={{
          display: 'grid',

          gridTemplateColumns:
            'repeat(auto-fill, minmax(300px, 1fr))',

          gap: '20px'
        }}
      >
        {filteredDatasets.map(
          (dataset) => (

            <Link

              key={dataset.id}

              to={`/datasets/${dataset.id}`}

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
                    '10px',

                  boxShadow:
                    '0 2px 8px rgba(0,0,0,0.1)'
                }}
              >
                <h2
                  style={{
                    color:
                      '#2563eb'
                  }}
                >
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
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default Datasets;