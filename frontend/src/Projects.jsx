import {
  useEffect,
  useState
} from 'react';

import axios from 'axios';

import toast from 'react-hot-toast';

import {
  Link
} from 'react-router-dom';



function Projects() {

  const [projects,
    setProjects] =
      useState([]);

  const [title,
    setTitle] =
      useState('');

  const [description,
    setDescription] =
      useState('');

  const [editingId,
    setEditingId] =
      useState(null);

  const [editTitle,
    setEditTitle] =
      useState('');

  const [editDescription,
    setEditDescription] =
      useState('');

  const [favoriteProjects,
    setFavoriteProjects] =
      useState([]);

  useEffect(() => {

    fetchProjects();

    const storedFavorites =
      JSON.parse(
        localStorage.getItem(
          'favoriteProjects'
        ) || '[]'
      ).map(String);

    setFavoriteProjects(
      storedFavorites
    );

  }, []);

  const fetchProjects =
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

            `http://localhost:5000/api/projects/user/${user.id}`
          );

        setProjects(
          response.data.projects
        );

      } catch (error) {

        console.error(error);
      }
    };

  const createProject =
    async () => {

      if (!title) {

        toast.error(
          'Enter project title'
        );

        return;
      }

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              'user'
            )
          );

        const response =
          await axios.post(

            'http://localhost:5000/api/projects',

            {
              title,

              description,

              userId:
                user.id
            }
          );

        setProjects([
          response.data.project,
          ...projects
        ]);

        setTitle('');

        setDescription('');

        toast.success(
          'Project created'
        );

      } catch (error) {

        console.error(error);

        toast.error(
          'Create failed'
        );
      }
    };

 const saveProject =
  async (id) => {

    try {

      const response =
        await axios.put(

          `http://localhost:5000/api/projects/${id}`,

          {
            title:
              editTitle,

            description:
              editDescription,

            userId:
              user.id
          }
        );

      setProjects(

        projects.map(
          (project) =>

            project.id === id
              ? response.data.project
              : project
          )
      );

      setEditingId(
        null
      );

      toast.success(
        'Project updated'
      );

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        'Update failed'
      );
    }
  };

const toggleProjectFavorite =
    (projectId) => {
      const storedFavorites =
        JSON.parse(
          localStorage.getItem(
            'favoriteProjects'
          ) || '[]'
        ).map(String);

      const stringId = String(projectId);

      const isFavorited =
        storedFavorites.includes(
          stringId
        );

      const updatedList =
        isFavorited
          ? storedFavorites.filter(
              (item) => item !== stringId
            )
          : [...storedFavorites, stringId];

      localStorage.setItem(
        'favoriteProjects',
        JSON.stringify(updatedList)
      );
      setFavoriteProjects(updatedList);
    };

  const deleteProject =
  async (id) => {

    try {

      await axios.delete(

        `http://localhost:5000/api/projects/${id}`,

        {
          data: {
            userId:
              user.id
          }
        }
      );

      setProjects(

        projects.filter(
          (project) =>
            project.id !== id
        )
      );

      toast.success(
        'Project deleted'
      );

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        'Delete failed'
      );
    }
  };
  return (
    <div className="page-content">
      <h1 className="page-title">Projects</h1>

      <div className="form-card" style={{ maxWidth: '520px', marginTop: '20px' }}>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="input-field"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="input-field"
          rows={4}
        />

        <button onClick={createProject} className="btn btn-primary">
          Create Project
        </button>
      </div>

      <div className="section-grid" style={{ marginTop: '40px' }}>

        {projects.map(
          (project) => (

            <div key={project.id} className="card">

              {editingId ===
              project.id ? (

                <>
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="input-field"
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="input-field"
                    rows={4}
                    style={{ marginTop: '10px' }}
                  />

                  <button
                    onClick={() => saveProject(project.id)}
                    className="btn btn-primary"
                    style={{ marginTop: '10px', marginRight: '10px' }}
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="btn btn-ghost"
                    style={{ marginTop: '10px' }}
                  >
                    Cancel
                  </button>
                </>

              ) : (

                <>
                  <Link to={`/projects/${project.id}`} className="result-link">
                    <h2 className="card-title">{project.title}</h2>
                  </Link>

                  <p>
                    {project.description}
                  </p>

                  <button
                    type="button"
                    className={
                      'icon-btn star' +
                      (favoriteProjects.includes(String(project.id))
                        ? ' active'
                        : '')
                    }
                    onClick={() =>
                      toggleProjectFavorite(
                        project.id
                      )
                    }
                    style={{ marginTop: '15px', marginRight: '10px' }}
                  >
                    <span className="icon">
                      {favoriteProjects.includes(String(project.id))
                        ? '★'
                        : '☆'}
                    </span>
                    Favorite
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(project.id);
                      setEditTitle(project.title);
                      setEditDescription(project.description);
                    }}
                    className="btn btn-secondary"
                    style={{ marginTop: '15px', marginRight: '10px' }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="btn btn-danger"
                    style={{ marginTop: '15px' }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Projects;