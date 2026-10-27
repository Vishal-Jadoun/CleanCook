import { useState } from 'react';
import { Link } from 'react-router-dom';
import potLogo from '../../assets/pot.svg';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [statusType, setStatusType] = useState('info');

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      setStatusType('error');
      setMessage('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setStatusType('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setStatusType('error');
      setMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setStatusType('error');
      setMessage('Passwords do not match. Please verify.');
      return;
    }

    setStatusType('success');
    setMessage('Account form validated! (Front-end demo mode: no backend database is connected).');
  }

  return (
    <section id="signup-page">
      <div className="signup-box">
        <div className="logo">
          <img src={potLogo} alt="CleanCook Logo" />
        </div>
        <h1>Create Account</h1>
        <p className="auth-subtitle">Join CleanCook to plan meals and track wellness.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="input-box">
            <input
              id="signup-name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setMessage('');
              }}
              autoComplete="name"
              aria-label="Full Name"
              required
            />
          </div>

          <div className="input-box">
            <input
              id="signup-email"
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
              id="signup-password"
              type="password"
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage('');
              }}
              autoComplete="new-password"
              aria-label="Password"
              required
            />
          </div>

          <div className="input-box">
            <input
              id="signup-confirm-password"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setMessage('');
              }}
              autoComplete="new-password"
              aria-label="Confirm Password"
              required
            />
          </div>

          <button className="signup-btn" type="submit">
            Create Account
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
          <small>ℹ️ Front-end demonstration — registration is simulated.</small>
        </div>

        <div className="login-redirect">
          Already have an account?{' '}
          <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </section>
  );
}

export default Signup;
