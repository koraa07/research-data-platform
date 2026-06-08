import { useNavigate } from 'react-router-dom';

function LandingPage() {

  const navigate =
    useNavigate();

  return (
    <div className="landing-page">

      <div className="hero-copy">

        <h1
  style={{
    fontSize: '72px',
    fontWeight: '800',
    lineHeight: '1.1',
    margin: 0,
    marginBottom: '30px',
    maxWidth: '700px',
    color: 'white'
  }}
>
  Research Data
  <br />
  Platform
</h1>
        <p
          style={{
            fontSize: '22px',
            color: '#cbd5e1',
            lineHeight: '1.7'
          }}
        >
          Share datasets, collaborate on projects,
          discover researchers and build
          scientific communities.
        </p>

        <div className="hero-actions">

          <button
            onClick={() => navigate('/register')}
            className="btn btn-primary"
            style={{ padding: '15px 30px', fontSize: '16px' }}
          >
            Create Account
          </button>

          <button
            onClick={() => navigate('/login')}
            className="btn btn-ghost"
            style={{ padding: '15px 30px', fontSize: '16px',color: '#cbd5e1' }}
          >
            Login
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '60px',
            color: '#cbd5e1'
          }}
        >
          <div>
            <h2>100+</h2>
            <span>Datasets</span>
          </div>

          <div>
            <h2>50+</h2>
            <span>Projects</span>
          </div>

          <div>
            <h2>20+</h2>
            <span>Researchers</span>
          </div>
        </div>
      </div>

      <div className="hero-graphic">
        <div className="hero-graphic-emoji">🚀</div>
      </div>
    </div>
  );
}

export default LandingPage;