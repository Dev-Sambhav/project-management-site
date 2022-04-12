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

  // redirect to user once login successful
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
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
      {!isLoading && <button className="btn">Login</button>}
      {error && <div className="error">{error}</div> }
    </form>
  );
};

export default Login;
