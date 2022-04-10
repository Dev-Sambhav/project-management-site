import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isLoading } = useSignup();
  const { user } = useAuthContext();
  const history = useHistory();

  // handling on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  // checking thumbnail file on every change whether it is image or not
  const handleFileChange = (e) => {
    setThumbnail(null);
    setThumbnailError(null);
    let selectedFile = e.target.files[0]; // it will return only first selected file
    console.log(selectedFile);
    if (!selectedFile) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selectedFile.type.includes("image")) {
      setThumbnailError("Please select a image file");
      return;
    }
    if (selectedFile.size > 100000) {
      setThumbnailError("Image size must be less than 100kb");
      return;
    }

    // if there is no error
    setThumbnail(selectedFile);
    console.log("Thumbnail updated");
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>
        <span>Display Name: </span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Email: </span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password: </span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Profile Thumbnail: </span>
        <input type="file" required onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isLoading && <button className="btn">Sign Up</button>}
      {isLoading && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
    </form>
  );
};

export default Signup;
