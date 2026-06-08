import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

function Profile() {

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  const [datasets, setDatasets] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const { t } = useLanguage();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {

    try {

      const datasetsRes =
        await axios.get(
          `http://localhost:5000/api/datasets/user/${user.id}`
        );

      const projectsRes =
        await axios.get(
          `http://localhost:5000/api/projects/user/${user.id}`
        );

      setDatasets(
        datasetsRes.data.datasets || []
      );

      setProjects(
        projectsRes.data.projects || []
      );

    } catch (error) {

      console.error(error);
    }
  };

  const recentActivity = [
    ...projects.slice(0, 2).map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      type: t.activityType.project,
      link: `/projects/${project.id}`,
    })),
    ...datasets.slice(0, 2).map((dataset) => ({
      id: dataset.id,
      title: dataset.title,
      description: dataset.description,
      type: t.activityType.dataset,
      link: `/datasets/${dataset.id}`,
    })),
  ];

  return (
    <div className="page-content profile-page">
      <div className="profile-header">
        <div className="profile-banner">
          <h1>{user.name}</h1>
          <p>{t.description}</p>

          <div className="profile-banner-grid">
            <div className="profile-banner-item">
              <span className="profile-banner-label">{t.email}</span>
              <strong>{user.email}</strong>
            </div>
            <div className="profile-banner-item">
              <span className="profile-banner-label">{t.datasets}</span>
              <strong>{datasets.length}</strong>
            </div>
            <div className="profile-banner-item">
              <span className="profile-banner-label">{t.projects}</span>
              <strong>{projects.length}</strong>
            </div>
          </div>
        </div>

        <div className="profile-actions-card">
          <h2>{t.quickActions}</h2>
          <div className="profile-actions">
            <Link to="/uploads" className="btn btn-primary">
              {t.uploadDataset}
            </Link>
            <Link to="/projects" className="btn btn-ghost">
              {t.browseProjects}
            </Link>
            <Link to="/favorites/datasets" className="btn btn-secondary">
              {t.favorites}
            </Link>
            <Link to="/settings" className="btn btn-ghost">
              {t.settings}
            </Link>
          </div>
        </div>
      </div>

      <div className="section-header">
        <div>
          <h2 className="section-title">{t.recentActivity}</h2>
          <p className="section-subtitle">{t.recentActivityDesc}</p>
        </div>
      </div>

      {recentActivity.length === 0 ? (
        <div className="empty-state-card">
          <h2>{t.noActivity}</h2>
          <p>{t.activityHint}</p>
          <div className="profile-actions">
            <Link to="/uploads" className="btn btn-primary">
              {t.addDataset}
            </Link>
            <Link to="/projects" className="btn btn-secondary">
              {t.startProject}
            </Link>
          </div>
        </div>
      ) : (
        <div className="section-card-grid">
          {recentActivity.map((item) => (
            <Link key={`${item.type}-${item.id}`} to={item.link} className="result-link">
              <div className="card">
                <h2 className="card-title">{item.title}</h2>
                <p>{item.description}</p>
                <p className="card-meta">{item.type}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <h2 className="section-title">{t.myProjects}</h2>

      {projects.length === 0 ? (
        <div className="empty-state-card">
          <h2>{t.noProjects}</h2>
          <p>{t.projectsHint}</p>
        </div>
      ) : (
        <div className="section-grid">
          {projects.slice(0, 3).map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`} className="result-link">
              <div className="card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        <Link to="/projects" className="view-more-link">
          {t.viewAllProjects}
        </Link>
      </div>

      <h2 className="section-title">{t.myDatasets}</h2>

      {datasets.length === 0 ? (
        <div className="empty-state-card">
          <h2>{t.noDatasets}</h2>
          <p>{t.datasetsHint}</p>
        </div>
      ) : (
        <div className="section-grid">
          {datasets.slice(0, 3).map((dataset) => (
            <Link key={dataset.id} to={`/datasets/${dataset.id}`} className="result-link">
              <div className="card">
                <h3>{dataset.title}</h3>
                <p>{dataset.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div style={{ marginTop: '10px' }}>
        <Link to="/my-datasets" className="view-more-link">
          {t.viewAllDatasets}
        </Link>
      </div>
    </div>
  );
}

export default Profile;