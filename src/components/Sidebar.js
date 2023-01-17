import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// styles and images
import "./Sidebar.css";
import DashboardIcon from "../assets/dashboard_icon.svg";
import AddIcon from "../assets/add_icon.svg";
import Avatar from "./Avatar";
import ChatIcon from "../assets/chat-icon.svg";
import FeedbackIcon from "../assets/feedback-icon.svg";

const Sidebar = () => {
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
              <NavLink exact to="/">
                <img src={DashboardIcon} alt="dash-icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add-icon" />
                <span>New Project</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/chatroom">
                <img src={ChatIcon} alt="chat-icon" />
                <span>Chat</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/feedback">
                <img src={FeedbackIcon} alt="chat-icon" />
                <span>Feedback</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
