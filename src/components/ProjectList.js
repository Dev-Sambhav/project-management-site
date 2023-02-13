import { Link } from "react-router-dom";
import {Avatar} from "../components";

// styles
import "./ProjectList.css"

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No Projects Yet!</p>}
      {projects.map((project) => (
        <Link to={`/projects/${project.id}`} key={project.id}>
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <p>Assigned to</p>
            <ul>
              {project.assignedUsersList.map((assignUser) => (
                <li key={assignUser.photoURL}>
                  <Avatar src={assignUser.photoURL}/>
                  <p>{assignUser.displayName}</p>
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
