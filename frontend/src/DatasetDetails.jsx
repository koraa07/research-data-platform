import {
  useEffect,
  useState
} from 'react';

import {
  useParams,
  useNavigate
} from 'react-router-dom';

import axios from 'axios';

import toast from 'react-hot-toast';

function DatasetDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [dataset,
    setDataset] =
    useState(null);

  const [comments,
    setComments] =
    useState([]);

  const [commentText,
    setCommentText] =
    useState('');

    const [editingCommentId,
  setEditingCommentId] =
  useState(null);

const [editCommentText,
  setEditCommentText] =
  useState('');

  useEffect(() => {

    fetchDataset();

    fetchComments();

  }, []);

  const fetchDataset =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/datasets/${id}`
          );

        setDataset(
          response.data.dataset
        );

      } catch (error) {

        console.error(error);

        toast.error(
          'Dataset not found'
        );
      }
    };

  const fetchComments =
    async () => {

      try {

        const response =
          await axios.get(

            `http://localhost:5000/api/comments/dataset/${id}`
          );

        setComments(
          response.data.comments
        );

      } catch (error) {

        console.error(error);
      }
    };

  const addComment =
    async () => {

      if (!commentText) {

        return;
      }

      try {

        const user =
          JSON.parse(
            localStorage.getItem(
              'user'
            )
          );

        await axios.post(

          'http://localhost:5000/api/comments',

          {
            text:
              commentText,

            userName:
              user.name,

            userId:
              user.id,

            datasetId:
              id
          }
        );

        setCommentText('');

        fetchComments();

        toast.success(
          'Comment added'
        );

      } catch (error) {

        console.error(error);

        toast.error(
          'Failed to add comment'
        );
      }
    };

    const saveComment =
  async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/api/comments/${id}`,

        {
          text:
            editCommentText
        }
      );

      toast.success(
        'Comment updated'
      );

      setEditingCommentId(
        null
      );

      fetchComments();

    } catch (error) {

      console.error(error);

      toast.error(
        'Update failed'
      );
    }
  };

  const deleteComment =
    async (commentId) => {

      try {

        await axios.delete(

          `http://localhost:5000/api/comments/${commentId}`
        );

        fetchComments();

        toast.success(
          'Comment deleted'
        );

      } catch (error) {

        console.error(error);

        toast.error(
          'Delete failed'
        );
      }
    };

  const deleteDataset =
    async () => {

      if (
        !window.confirm(
          'Delete dataset?'
        )
      ) {
        return;
      }

      try {

        await axios.delete(

          `http://localhost:5000/api/datasets/${id}`
        );

        toast.success(
          'Dataset deleted'
        );

        navigate(
          '/datasets'
        );

      } catch (error) {

        console.error(error);

        toast.error(
          'Delete failed'
        );
      }
    };

  if (!dataset) {

    return (
      <h2
        style={{
          padding: '40px'
        }}
      >
        Loading...
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: '40px'
      }}
    >
      <h1>
        {dataset.title}
      </h1>

      <div
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          marginTop: '20px'
        }}
      >
        <p>
          <strong>
            Description:
          </strong>{' '}
          {dataset.description}
        </p>

        <p>
          <strong>
            Category:
          </strong>{' '}
          {dataset.category}
        </p>

        <p>
  <strong>
    Likes:
  </strong>

  {' '}

  {dataset.likes || 0}
</p>

        <p>
          <strong>
            File:
          </strong>{' '}
          {dataset.filename}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent:
              'center',
            marginTop: '20px'
          }}
        >
          <a
            href={
              `http://localhost:5000/uploads/${dataset.filename}`
            }
            target="_blank"
            rel="noreferrer"
            style={{
              padding:
                '10px 15px',
              background:
                '#2563eb',
              color:
                'white',
              textDecoration:
                'none',
              borderRadius:
                '8px'
            }}
          >
            Download File
          </a>
        </div>
      </div>

      <button

  onClick={async () => {

    try {

      await axios.put(

        `http://localhost:5000/api/datasets/like/${id}`
      );

      fetchDataset();

    } catch (error) {

      console.error(error);
    }
  }}

  style={{
    marginTop: '15px',

    padding: '10px 15px',

    background: '#e11d48',

    color: 'white',

    border: 'none',

    borderRadius: '8px',

    cursor: 'pointer'
  }}
>
  ❤️ Like
</button>

      <div
        style={{
          background: 'white',
          padding: '25px',
          borderRadius: '12px',
          marginTop: '30px'
        }}
      >
        <h2>
          Comments
        </h2>

        <textarea
          value={commentText}
          onChange={(e) =>
            setCommentText(
              e.target.value
            )
          }
          placeholder="Write a comment..."
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '10px',
            marginTop: '15px'
          }}
        />

        <button
          onClick={addComment}
          style={{
            marginTop: '10px',
            padding:
              '10px 15px',
            background:
              '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius:
              '8px',
            cursor: 'pointer'
          }}
        >
          Add Comment
        </button>

        <div
          style={{
            marginTop: '30px'
          }}
        >
  {comments.map(
  (comment) => (

    <div
      key={comment.id}
      style={{
        borderBottom:
          '1px solid #ddd',
        padding:
          '15px 0'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent:
            'space-between'
        }}
      >
        <strong>
          {comment.userName}
        </strong>

        {comment.userId ===
          JSON.parse(
            localStorage.getItem(
              'user'
            )
          )?.id && (

          <div
            style={{
              display: 'flex',
              gap: '10px'
            }}
          >
            <button

              onClick={() => {

                setEditingCommentId(
                  comment.id
                );

                setEditCommentText(
                  comment.text
                );
              }}

              style={{
                background:
                  '#2563eb',
                color:
                  'white',
                border:
                  'none',
                borderRadius:
                  '6px',
                cursor:
                  'pointer'
              }}
            >
              Edit
            </button>

            <button

              onClick={() =>
                deleteComment(
                  comment.id
                )
              }

              style={{
                background:
                  '#dc2626',
                color:
                  'white',
                border:
                  'none',
                borderRadius:
                  '6px',
                cursor:
                  'pointer'
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {editingCommentId ===
      comment.id ? (

        <>
          <textarea

            value={
              editCommentText
            }

            onChange={(e) =>
              setEditCommentText(
                e.target.value
              )
            }

            style={{
              width: '100%',
              marginTop: '10px',
              padding: '10px'
            }}
          />

          <div
            style={{
              marginTop: '10px',
              display: 'flex',
              gap: '10px'
            }}
          >
            <button

              onClick={() =>
                saveComment(
                  comment.id
                )
              }
            >
              Save
            </button>

            <button

              onClick={() =>
                setEditingCommentId(
                  null
                )
              }
            >
              Cancel
            </button>
          </div>
        </>

      ) : (

    <div
  style={{
    marginTop: '8px'
  }}
>
  <p>
    {comment.text}
  </p>

  <small
    style={{
      color: '#666'
    }}
  >
    {new Date(
      comment.createdAt
    ).toLocaleString()}
  </small>
</div>
      )}
    </div>
  )
)}
        </div>
      </div>
    </div>
  );
}

export default DatasetDetails;