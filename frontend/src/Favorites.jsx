import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Favorites() {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);

      const favoriteKey =
        type === 'projects'
          ? 'favoriteProjects'
          : 'favoriteDatasets';

      const ids = JSON.parse(
        localStorage.getItem(favoriteKey) || '[]'
      ).map(String);

      if (!ids.length) {
        setItems([]);
        setLoading(false);
        return;
      }

      try {
        if (type === 'projects') {
          const response = await axios.get(
            'http://localhost:5000/api/projects'
          );
          setItems(
            response.data.projects.filter((item) =>
              ids.includes(item.id)
            )
          );
        } else {
          const response = await axios.get(
            'http://localhost:5000/api/datasets'
          );
          setItems(
            response.data.datasets.filter((item) =>
              ids.includes(String(item.id))
            )
          );
        }
      } catch (error) {
        console.error(error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [type]);

  if (type !== 'datasets' && type !== 'projects') {
    return (
      <div className="page-content">
        <h1 className="page-title">Favorites</h1>
        <p className="text-muted">
          Choose a favorite collection from your profile menu.
        </p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="favorite-header">
        <div>
          <h1 className="page-title">
            {type === 'datasets' ? 'Favorite Datasets' : 'Favorite Projects'}
          </h1>
          <p className="text-muted">
            Your saved {type === 'datasets' ? 'datasets' : 'projects'} are shown here.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-muted">Loading favorites...</div>
      ) : items.length === 0 ? (
        <div className="text-muted">
          No favorites yet. Mark heart or star on a dataset or project to save it.
        </div>
      ) : (
        <div className="section-grid">
          {items.map((item) => (
            <Link
              key={item.id}
              to={
                type === 'datasets'
                  ? '/datasets/' + item.id
                  : '/projects/' + item.id
              }
              className="card result-link"
            >
              <div className="dataset-card-header">
                <div>
                  <h2 className="card-title">{item.title || item.name}</h2>
                  <p className="text-muted">
                    {item.description || item.summary || 'No description provided.'}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
