// styles
import "./Avatar.css";

const Avatar = ({ src }) => {
  return (
    <div className="avatar">
      <img src={src} alt="user-logo" />
    </div>
  );
};

export default Avatar;
