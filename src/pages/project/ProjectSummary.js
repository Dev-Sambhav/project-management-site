import Avatar from "../../components/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProjectSummary = ({ project }) => {
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const history = useHistory();

  const handleClick = () => {
    deleteDocument(project.id);
    history.push("/");
  };
  return (
    <div>
      <h2 className="page-title project-title">{project.name}</h2>
      <div className="project-summary">
        <span className="created-by">
          Created by {project.createdBy.displayName}
        </span>
        <p className="due-date">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="details">{project.details}</p>
        <h4>Project assigned to:</h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} />
              <p>{user.displayName}</p>
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
};

export default ProjectSummary;
