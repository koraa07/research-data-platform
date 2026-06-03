import {
  useState,
  useEffect
} from 'react';

import axios from 'axios';


function Uploads() {

  const [file, setFile] =
    useState(null);

  const [title, setTitle] =
    useState('');

  const [description,
    setDescription] =
      useState('');

  const [category,
    setCategory] =
      useState('');

  const [projects,
    setProjects] =
      useState([]);

  const [projectId,
    setProjectId] =
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

  const handleUpload =
    async () => {

      if (!file) {

        alert(
          'Select file first'
        );

        return;
      }

      const formData =
        new FormData();

      formData.append(
        'file',
        file
      );

      formData.append(
        'title',
        title
      );

      formData.append(
        'description',
        description
      );

      formData.append(
        'category',
        category
      );

      const user =
        JSON.parse(
          localStorage.getItem(
            'user'
          )
        );

      formData.append(
        'userId',
        user.id
      );

      formData.append(
        'projectId',
        projectId
      );

      try {

        const response =
          await axios.post(

            'http://localhost:5000/api/uploads',

            formData
          );

        console.log(
          response.data
        );

        alert(
          'Dataset uploaded'
        );

        setTitle('');

        setDescription('');

        setCategory('');

        setProjectId('');

        setFile(null);

      } catch (error) {

        console.error(error);

        alert(
          'Upload failed'
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
        Upload Dataset
      </h1>

      <div
        style={{
          marginTop: '30px',

          display: 'flex',

          flexDirection:
            'column',

          gap: '15px',

          maxWidth:
            '400px'
        }}
      >
        <input

          type="text"

          placeholder="Dataset title"

          value={title}

          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
        />

        <textarea

          placeholder="Description"

          value={description}

          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <input

          type="text"

          placeholder="Category"

          value={category}

          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        />

        <select

          value={projectId}

          onChange={(e) =>
            setProjectId(
              e.target.value
            )
          }

          style={{
            padding: '10px'
          }}
        >
          <option value="">
            No Project
          </option>

          {projects.map(
            (project) => (

              <option

                key={project.id}

                value={
                  project.id
                }
              >
                {project.title}
              </option>
            )
          )}
        </select>

        <input

          type="file"

          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <button

          onClick={
            handleUpload
          }

          style={{
            padding: '10px',

            cursor:
              'pointer'
          }}
        >
          Upload Dataset
        </button>
      </div>
    </div>
  );
}

export default Uploads;