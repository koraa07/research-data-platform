import {
  useState,
  useEffect
} from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';


function Uploads() {

  const [file, setFile] =
    useState(null);

  const [uploadSuccess,
    setUploadSuccess] =
      useState(false);

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

        setUploadSuccess(true);
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
    <div className="page-content upload-page">
      <div className="upload-header">
        <div>
          <h1>Upload Dataset</h1>
          <p className="text-muted">
            Add a dataset, tag it with category and project, and keep your research files organized.
          </p>
        </div>
        <div className="upload-summary">
          <div>
            <strong>Hint</strong>
            <p>Use a clear title, short description and choose the correct project.</p>
          </div>
        </div>
      </div>

      <div className="upload-shell">
        <div className="upload-card form-card">
          <label className="full-width">
            Dataset title
            <input
              type="text"
              placeholder="Dataset title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
            />
          </label>

          <label className="full-width">
            Description
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-field"
              style={{ minHeight: '140px' }}
            />
          </label>

          <div className="upload-grid">
            <label>
              Category
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
              />
            </label>

            <label>
              Project
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="input-field"
              >
                <option value="">No project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="file-drop-zone full-width">
            <span className="file-label">Select dataset file</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file && <div className="file-info">Selected: {file.name}</div>}
          </label>

          {uploadSuccess ? (
            <div className="success-state-card">
              <h2>Successfully uploaded!</h2>
              <p>
                Your dataset is now available in My Datasets. You can upload another dataset or return to review your collection.
              </p>
              <div className="success-actions">
                <Link to="/my-datasets" className="btn btn-primary">
                  Go back to My Datasets
                </Link>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setUploadSuccess(false)}
                >
                  Upload another dataset
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={handleUpload}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Upload Dataset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Uploads;