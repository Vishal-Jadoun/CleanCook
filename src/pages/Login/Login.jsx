import "./Login.css";
function Login() {


//js




  return (



    //html



    <section id="login-page">
      
    <div className="login-box">

      <div className="logo">
        <img src="#" alt="" /> {/*logo*/}
      </div>
      <h1>Clean Cook</h1>

      <form>

            <div class="input-box">
              
                <input
                    type="email"
                    placeholder="Email"
                    required
                />
            </div>

            <div class="input-box">
                <input
                    type="password"
                    placeholder="Password"
                    required
                />
            </div>

            <button class="login-btn" type="submit">
                Sign In
            </button>

        </form>

        <div class="signup">
            Don't have an account?
            <a href="#">Sign up, it's free!</a>
        </div>

    </div>

    </section>
  );
}

export default Login;
