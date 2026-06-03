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

  useEffect(() => {

    fetchProjects();

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
    <div
      style={{
        padding: '40px'
      }}
    >
      <h1>
        Projects
      </h1>

      <div
        style={{
          background: 'white',

          padding: '20px',

          borderRadius: '12px',

          marginTop: '20px',

          maxWidth: '500px',

          display: 'flex',

          flexDirection: 'column',

          gap: '15px'
        }}
      >
        <input

          value={title}

          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }

          placeholder="Project title"

          style={{
            padding: '12px'
          }}
        />

        <textarea

          value={description}

          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }

          placeholder="Description"

          style={{
            padding: '12px'
          }}
        />

        <button

          onClick={
            createProject
          }

          style={{
            padding: '12px',

            background:
              '#2563eb',

            color:
              'white',

            border:
              'none',

            borderRadius:
              '8px',

            cursor:
              'pointer'
          }}
        >
          Create Project
        </button>
      </div>

      <div
        style={{
          display: 'grid',

          gridTemplateColumns:
            'repeat(auto-fill, minmax(300px, 1fr))',

          gap: '20px',

          marginTop: '40px'
        }}
      >
        {projects.map(
          (project) => (

            <div

              key={project.id}

              style={{
                background:
                  'white',

                padding:
                  '20px',

                borderRadius:
                  '12px',

                boxShadow:
                  '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              {editingId ===
              project.id ? (

                <>
                  <input

                    value={
                      editTitle
                    }

                    onChange={(e) =>
                      setEditTitle(
                        e.target.value
                      )
                    }

                    style={{
                      width:
                        '100%',

                      padding:
                        '10px'
                    }}
                  />

                  <textarea

                    value={
                      editDescription
                    }

                    onChange={(e) =>
                      setEditDescription(
                        e.target.value
                      )
                    }

                    style={{
                      width:
                        '100%',

                      padding:
                        '10px',

                      marginTop:
                        '10px'
                    }}
                  />

                  <button

                    onClick={() =>
                      saveProject(
                        project.id
                      )
                    }

                    style={{
                      marginTop:
                        '10px',

                      marginRight:
                        '10px'
                    }}
                  >
                    Save
                  </button>

                  <button

                    onClick={() =>
                      setEditingId(
                        null
                      )
                    }
                  >
                    Cancel
                  </button>
                </>

              ) : (

                <>
                  <Link

                    to={`/projects/${project.id}`}

                    style={{
                      textDecoration:
                        'none',

                      color:
                        '#2563eb'
                    }}
                  >
                    <h2>
                      {project.title}
                    </h2>
                  </Link>

                  <p>
                    {project.description}
                  </p>

                  <button

                    onClick={() => {

                      setEditingId(
                        project.id
                      );

                      setEditTitle(
                        project.title
                      );

                      setEditDescription(
                        project.description
                      );
                    }}

                    style={{
                      marginTop:
                        '15px',

                      marginRight:
                        '10px',

                      padding:
                        '10px',

                      background:
                        '#2563eb',

                      color:
                        'white',

                      border:
                        'none',

                      borderRadius:
                        '8px',

                      cursor:
                        'pointer'
                    }}
                  >
                    Edit
                  </button>

                  <button

                    onClick={() =>
                      deleteProject(
                        project.id
                      )
                    }

                    style={{
                      marginTop:
                        '15px',

                      padding:
                        '10px',

                      background:
                        '#dc2626',

                      color:
                        'white',

                      border:
                        'none',

                      borderRadius:
                        '8px',

                      cursor:
                        'pointer'
                    }}
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