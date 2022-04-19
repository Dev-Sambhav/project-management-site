import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";

// styles
import "./Project.css";
//components
import ProjectComments from "./ProjectComments";
import ProjectSummary from "./ProjectSummary";

const Project = () => {
  const { id } = useParams();
  const { document: project, error, isLoading } = useDocument("projects", id);
  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!project) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="project-details">
      <ProjectSummary project={project} />
      <ProjectComments project={project} />
    </div>
  );
};

export default Project;
