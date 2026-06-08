import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function ForumThread() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThread();
  }, [id]);

  const loadThread = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/forum/thread/${id}`);
      setThread(response.data.root);
      setReplies(response.data.replies || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addReply = async () => {
    const trimmed = replyText.trim();
    if (!trimmed) {
      toast.error('Write a reply first.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      toast.error('You must be logged in to reply.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/forum', {
        content: trimmed,
        userName: user.name,
        userId: user.id,
        parentId: id
      });

      setReplyText('');
      loadThread();
      toast.success('Reply added.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add reply.');
    }
  };

  if (loading) {
    return (
      <div className="page-content">
        <h1 className="page-title">Loading thread...</h1>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="page-content">
        <h1 className="page-title">Thread not found</h1>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/forum')}>
          Back to forum
        </button>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="detail-header">
        <div>
          <h1>Thread</h1>
          <p className="text-muted">Continue the conversation or add your reply.</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/forum')}>
          Back to forum
        </button>
      </div>

      <div className="card forum-thread-card">
        <div className="forum-card-header">
          <div className="forum-avatar">{thread.userName?.[0]?.toUpperCase()}</div>
          <div>
            <h2 className="card-title">{thread.userName}</h2>
            <p className="forum-meta">{new Date(thread.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <p className="forum-thread-content">{thread.content}</p>
      </div>

      <div className="card forum-compose">
        <h2 className="card-title">Reply</h2>
        <textarea
          className="textarea-field"
          rows={4}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write your reply..."
        />
        <div className="forum-actions">
          <button type="button" className="btn btn-primary" onClick={addReply}>
            Post reply
          </button>
        </div>
      </div>

      <div className="section-title">Replies</div>
      {replies.length === 0 ? (
        <div className="text-muted">No replies yet. Be the first to respond.</div>
      ) : (
        <div className="comments-list">
          {replies.map((reply) => (
            <div key={reply.id} className="comment-card">
              <div className="comment-card-header">
                <div className="comment-author">
                  <div className="comment-avatar">{reply.userName?.[0]?.toUpperCase()}</div>
                  <div>
                    <strong>{reply.userName}</strong>
                    <div className="comment-meta">{new Date(reply.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              </div>
              <p className="comment-text">{reply.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ForumThread;
