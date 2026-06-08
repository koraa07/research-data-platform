import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Forum() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/forum');
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    const trimmed = content.trim();
    if (!trimmed) {
      toast.error('Write something before posting.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (!user) {
      toast.error('You must be logged in to post.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/forum', {
        content: trimmed,
        userName: user.name,
        userId: user.id
      });

      setContent('');
      loadPosts();
      toast.success('Thread created.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create thread.');
    }
  };

  return (
    <div className="page-content">
      <div className="detail-header">
        <div>
          <h1>Forum</h1>
          <p className="text-muted">
            A dedicated discussion feed for announcements, questions and thread-style conversations.
          </p>
        </div>
      </div>

      <div className="card forum-compose">
        <h2 className="card-title">Start a new thread</h2>
        <textarea
          className="textarea-field"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share an update, ask a question, or start a conversation..."
        />
        <div className="forum-actions">
          <button type="button" className="btn btn-primary" onClick={createPost}>
            Post thread
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-muted">Loading forum posts...</div>
      ) : posts.length === 0 ? (
        <div className="text-muted">No threads yet. Start the first discussion.</div>
      ) : (
        <div className="section-grid">
          {posts.map((post) => (
            <Link key={post.id} to={`/forum/${post.id}`} className="card forum-card result-link">
              <div className="forum-card-header">
                <div className="forum-avatar">{post.userName?.[0]?.toUpperCase()}</div>
                <div>
                  <h2 className="card-title">{post.userName}</h2>
                  <p className="forum-meta">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <p className="forum-excerpt">{post.content.length > 220 ? `${post.content.slice(0, 220)}...` : post.content}</p>
              <div className="forum-thread-footer">
                <span>Open thread</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Forum;
