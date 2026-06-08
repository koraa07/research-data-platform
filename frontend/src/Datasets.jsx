import {
  useEffect,
  useState
} from 'react';

import {
  Link
} from 'react-router-dom';

import axios from 'axios';

import { useLanguage } from './LanguageContext';

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

      const { t } = useLanguage();

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

  const handleSearch =
    (value) => {
      setSearch(value);
    };

  const filteredDatasets =
    datasets.filter(
      (dataset) => {

        const searchLower =
          search.toLowerCase();

        const matchesSearch =
          !searchLower ||
          dataset.title
            .toLowerCase()
            .includes(searchLower) ||
          dataset.description
            .toLowerCase()
            .includes(searchLower) ||
          dataset.filename
            .toLowerCase()
            .includes(searchLower);

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
    <div className="page-content">
      <h1 className="page-title">Research Datasets</h1>

      <div className="filter-row">
        <input
          type="text"
          placeholder="Search datasets..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="input-field"
          style={{ maxWidth: '300px' }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select-field"
          style={{ maxWidth: '220px' }}
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

      {filteredDatasets.length === 0 ? (
        <div className="text-muted">No datasets found.</div>
      ) : (
        <div className="section-grid">
          {filteredDatasets.map((dataset) => (
            <Link key={dataset.id} to={'/datasets/' + dataset.id} className="result-link">
              <div className="card dataset-card">
                <div className="dataset-card-header">
                  <h2 className="card-title">{dataset.title}</h2>
                  <span className="dataset-badge">{dataset.category}</span>
                </div>

                <p className="dataset-description">
                  {dataset.description}
                </p>

                <div className="dataset-footer">
                  <span>File: {dataset.filename}</span>
                  <span>Author: {dataset.userName || 'Unknown'}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Datasets;