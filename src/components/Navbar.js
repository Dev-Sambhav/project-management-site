import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

// styles and images
import "./Navbar.css";
import Logo from "../assets/project-icon.svg";

const Navbar = () => {
  const { isLoading, logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <img src={Logo} alt="project-logo" />
          <span style={{color:"#424242"}}>Pro Manager</span>
        </li>
        {!user && (
          <>
            <li>
              <Link className="btn" to="/login">Login</Link>
            </li>
            <li>
              <Link className="btn" to="/signup">Signup</Link>
            </li>
          </>
        )}
        {user && (
          <>
            {isLoading && (
              <li>
                <button className="btn" disabled>
                  Logging out...
                </button>
              </li>
            )}
            {!isLoading && (
              <li>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
