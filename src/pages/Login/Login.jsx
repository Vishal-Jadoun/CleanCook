import { useState } from 'react';
import { Link } from 'react-router-dom';
import potLogo from '../../assets/pot.svg';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [statusType, setStatusType] = useState('info');

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setStatusType('error');
      setMessage('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      setStatusType('error');
      setMessage('Password must be at least 6 characters.');
      return;
    }

    setStatusType('success');
    setMessage('Sign in validated! (Front-end demo mode: no backend session is active).');
  }

  return (
    <section id="login-page">
      <div className="login-box">
        <div className="logo">
          <img src={potLogo} alt="CleanCook Logo" />
        </div>
        <h1>Clean Cook</h1>
        <p className="auth-subtitle">Welcome back! Sign in to continue.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-box">
            <input
              id="login-email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage('');
              }}
              autoComplete="email"
              aria-label="Email Address"
              required
            />
          </div>

          <div className="input-box">
            <input
              id="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage('');
              }}
              autoComplete="current-password"
              aria-label="Password"
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Sign In
          </button>
        </form>

        {message && (
          <p
            className={`auth-message ${statusType}`}
            role={statusType === 'error' ? 'alert' : 'status'}
          >
            {message}
          </p>
        )}

        <div className="auth-demo-badge">
          <small>ℹ️ Front-end demonstration — authentication is simulated.</small>
        </div>

        <div className="signup">
          Don't have an account?{' '}
          <Link to="/signup">Sign up, it's free!</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
