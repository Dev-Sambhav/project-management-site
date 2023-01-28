import { NavLink } from "react-router-dom";
import Avatar from "../../../components/Avatar";
import Project from "../../../assets/project.svg"
import User from "../../../assets/user.svg"

import "./AdminSidebar.css";
import { useAuthContext } from "../../../hooks/useAuthContext";
export default function AdminSidebar() {
    const { user } = useAuthContext();
  // short the user name
  const longName = user.displayName;
  const names = longName.split(" ");
  const shortName = names[0];
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <Avatar src={user.photoURL} />
          <p>Hey {shortName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink exact to="/projects">
                <img src={Project} alt="dash-icon" />
                <span>Project</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/users">
                <img src={User} alt="add-icon" />
                <span>Users</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
