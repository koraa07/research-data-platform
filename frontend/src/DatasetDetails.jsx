import {
  useEffect,
  useState
} from 'react';

import {
  useParams,
  useNavigate,
  Link
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

  const [isFavorite,
    setIsFavorite] =
    useState(false);

  const [liked,
    setLiked] =
    useState(false);

  useEffect(() => {
    const favorites =
      JSON.parse(
        localStorage.getItem(
          'favoriteDatasets'
        ) || '[]'
      ).map(String);

    setIsFavorite(
      favorites.includes(id)
    );

    const likedList =
      JSON.parse(
        localStorage.getItem(
          'likedDatasets'
        ) || '[]'
      );

    setLiked(
      likedList.includes(id)
    );

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

  const toggleFavorite = () => {
    const storageKey = 'favoriteDatasets';
    const current =
      JSON.parse(
        localStorage.getItem(
          storageKey
        ) || '[]'
      );

    const isNowFavorited =
      !current.includes(id);

    const updated =
      isNowFavorited
        ? [...current, id]
        : current.filter((item) => item !== id);

    localStorage.setItem(
      storageKey,
      JSON.stringify(updated)
    );
    setIsFavorite(isNowFavorited);
    toast.success(
      isNowFavorited
        ? 'Added to favorites'
        : 'Removed from favorites'
    );
  };

  const toggleLike =
    async () => {
      const user =
        JSON.parse(
          localStorage.getItem(
            'user'
          )
        );

      try {
        await axios.put(
          `http://localhost:5000/api/datasets/like/${id}`,
          {
            userId: user?.id
          }
        );

        const storedLikes =
          JSON.parse(
            localStorage.getItem(
              'likedDatasets'
            ) || '[]'
          );

        const isNowLiked =
          !storedLikes.includes(id);

        const updatedLikes =
          isNowLiked
            ? [...storedLikes, id]
            : storedLikes.filter(
                (item) => item !== id
              );

        localStorage.setItem(
          'likedDatasets',
          JSON.stringify(updatedLikes)
        );

        setLiked(isNowLiked);
        fetchDataset();
        toast.success(
          isNowLiked
            ? 'Added like'
            : 'Removed like'
        );
      } catch (error) {
        alert(
          error.response?.data?.message ||
            'Like failed'
        );
        console.error(error);
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
      <div className="page-content">
        <h2 className="page-title">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="page-content dataset-details-page">
      <div className="detail-header">
        <div>
          <h1>{dataset.title}</h1>
          <p className="text-muted">
            Explore the dataset details, download the file, like it, and join the discussion.
          </p>
        </div>
      </div>

      <div className="dataset-detail-card">
        <div className="dataset-actions">
          <button
            type="button"
            className={
              'icon-btn heart' +
              (liked ? ' active' : '')
            }
            onClick={toggleLike}
          >
            <span className="icon">
              {liked ? '♥' : '♡'}
            </span>
            Like
          </button>
          <button
            type="button"
            className={
              'icon-btn star' +
              (isFavorite ? ' active' : '')
            }
            onClick={toggleFavorite}
          >
            <span className="icon">
              {isFavorite ? '★' : '☆'}
            </span>
            Favorites
          </button>
        </div>
        <div className="dataset-detail-summary">
          <div>
            <h2 className="card-title">Summary</h2>
            <p>{dataset.description}</p>
          </div>
          <div className="dataset-info-list">
            <div className="dataset-info-item">
              <span>Category</span>
              <strong>{dataset.category}</strong>
            </div>
            <div className="dataset-info-item">
              <span>Likes</span>
              <strong>{dataset.likes || 0}</strong>
            </div>
            <div className="dataset-info-item">
              <span>File</span>
              <strong>{dataset.filename}</strong>
            </div>
          </div>
        </div>

        <a
          href={`http://localhost:5000/uploads/${dataset.filename}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
          style={{ width: 'fit-content', marginTop: '20px' }}
        >
          Download File
        </a>
      </div>

      <div className="comment-panel">
        <div className="comment-panel-header">
          <h2>Comments</h2>
          <button type="button" className="btn btn-secondary" onClick={addComment}>
            Add comment
          </button>
        </div>

        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="textarea-field"
        />

        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment-card">
              <div className="comment-card-header">
                <Link to={`/profile/${comment.userId}`} className="comment-author">
                  <div className="comment-avatar">
                    {comment.userName?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <strong>{comment.userName}</strong>
                    <div className="comment-meta">{new Date(comment.createdAt).toLocaleString()}</div>
                  </div>
                </Link>
                {comment.userId === JSON.parse(localStorage.getItem('user'))?.id && (
                  <div className="comment-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditingCommentId(comment.id);
                        setEditCommentText(comment.text);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              {editingCommentId === comment.id ? (
                <div className="comment-editing-row">
                  <textarea
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className="textarea-field"
                  />
                  <div className="comment-edit-controls">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => saveComment(comment.id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="comment-text">{comment.text}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default DatasetDetails;