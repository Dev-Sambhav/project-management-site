import { useCollection } from "../hooks/useCollection";

// styles
import "./OnlineUsers.css";

// component
import {Avatar} from "./"

const OnlineUsers = () => {
  const { documents: users, error, isLoading } = useCollection("users");
  return (
    <>
      <div className="user-list">
      <h2>All Users</h2>
        {isLoading && <div>Loading users...</div>}
        {error && <div className="error">{error}</div>}
        {users &&
          users.map((user) => (
            <div key={user.id} className="user-list-item">
              {user.online && <span className="online-user"></span>}
              <span>{user.displayName}</span>
              <Avatar src={user.photoURL} />
            </div>
          ))}
      </div>
    </>
  );
};

export default OnlineUsers;
