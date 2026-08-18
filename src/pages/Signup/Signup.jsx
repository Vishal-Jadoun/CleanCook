import './Signup.css';

function Signup() {
  return (
    <section id="signup-page" className="signup-page">
      
      <div className="signin-container">

        {/* LEFT SIDE - STATIC IMAGE */}
        <div className="signin-left">

          <img
            src="/images/food.jpg"
            alt="Fresh food"
            className="signin-image"
          />

          <div className="image-content">
            <h2>
              Fresh Food,<br />
              Happy Life.
            </h2>

            <p>
              Cook fresh. Eat healthy. Live better.
            </p>
          </div>

        </div>


        {/* RIGHT SIDE - SIGN IN */}
        <div className="signin-right">

          <div className="signin-content">

            {/* Logo */}
            <div className="signin-logo">
              <img src="#logo" alt="" />
            </div>


            {/* Heading */}
            <h1>Welcome Back!</h1>

            <p className="signin-description">
              Sign in to continue to Clean Cook
            </p>


            {/* Form */}
            <form>

              {/* Email */}
              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />

              </div>


              {/* Password */}
              <div className="form-group">

                <div className="password-header">

                  <label>Password</label>

                  <a href="#">
                    Forgot password?
                  </a>

                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                />

              </div>


              {/* Remember Me */}
              <div className="remember-me">

                <label>

                  <input type="checkbox" />

                  <span>Remember me</span>

                </label>

              </div>


              {/* Sign In */}
              <button
                type="submit"
                className="signin-button"
              >
                Sign In
              </button>

            </form>


            {/* Sign Up */}
            <p className="signup-text">

              Don't have an account?

              <a href="#">
                Sign up
              </a>

            </p>

          </div>

        </div>

      </div>

      
    </section>
  );
}

export default Signup;
