import { useState } from 'react';
import axios from 'axios';

function Uploads() {
  const [file, setFile] = useState(null);

  const [title, setTitle] = useState('');

  const [description, setDescription] =
    useState('');

  const [category, setCategory] =
    useState('');

  const handleUpload = async () => {
    if (!file) {
      alert('Select file first');
      return;
    }

    const formData = new FormData();

    formData.append('file', file);

    formData.append('title', title);

    formData.append(
      'description',
      description
    );

    formData.append('category', category);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/uploads',
        formData
      );

      console.log(response.data);

      alert('Dataset uploaded');

    } catch (error) {
      console.error(error);

      alert('Upload failed');
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
          flexDirection: 'column',
          gap: '15px',
          maxWidth: '400px'
        }}
      >
        <input
          type="text"
          placeholder="Dataset title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        />

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          onClick={handleUpload}
          style={{
            padding: '10px',
            cursor: 'pointer'
          }}
        >
          Upload Dataset
        </button>
      </div>
    </div>
  );
}

export default Uploads;