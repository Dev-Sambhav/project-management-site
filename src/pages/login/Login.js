import { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const history = useHistory();
  const { user } = useAuthContext();

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // handle google login
  const handleGoogleLogin = ()=>{
    console.log("Google Login Successful")
  }

  // handle facebook login
  const handleFacebookLogin = ()=>{
    console.log("Facebook Login Successful")
  }

  // redirect to user once login successful
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <form className="auth-form login-form">
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          value={password}
        />
      </label>
      {isLoading && (
        <button className="btn" disabled>
          Logging...
        </button>
      )}
      {!isLoading && <button type="button" onClick={handleSubmit} className="btn">Login</button>}
      {error && <div className="error">{error}</div>}
      <div class="hl">
        <span class="hl-innertext">or</span>
      </div>
      <div className="login-icon">
        <button type="button" onClick={handleGoogleLogin} class="google btn">
          <i class="fa fa-google fa-fw"></i> Google
        </button>
        <button type="button" onClick={handleFacebookLogin} class="fb btn">
          <i class="fa fa-facebook fa-fw"></i> Facebook
        </button>
      </div>
    </form>
  );
};

export default Login;
