import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  // Store what the user types.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Store the message shown after submitting.
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    // Prevent the form from refreshing the page.
    event.preventDefault();

    setMessage(
      "Form submitted. This is a demo; account verification is not connected yet."
    );
  }

  return (
    <section id="login-page">
      <div className="login-box">
        <h1>Clean Cook</h1>
        <p>Welcome back! Enter your details.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="email">Email</label>

            <input id="email" type="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required/>
          </div>

          <div className="input-box">
            <label htmlFor="password">Password</label>

            <input id="password" type="password" placeholder="Enter your password" value={password}onChange={(event) =>     setPassword(event.target.value)} autoComplete="current-password" required/>
          </div>

          <button className="login-btn" type="submit">
            Sign In
          </button>
        </form>

        {message && <p role="status">{message}</p>}

        <div className="signup">
          Don't have an account?{" "}
          <Link to="/signup">Sign up, it's free!</Link>
        </div>
      </div>
    </section>
  );
}

export default Login;