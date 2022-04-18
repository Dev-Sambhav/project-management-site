import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";

// styles
import "./Project.css";

const Project = () => {
  const { id } = useParams();
  const { document: project, error, isLoading } = useDocument("projects", id);
  if(error){
    return <div className="error">{error}</div>
  }
  if(!project){
    return <div className="loading">Loading...</div>
  }
  return (
    <div className="project-details">
      <ProjectSummary project = {project}/>
      <ProjectComments />
    </div>
  );
};

export default Project;
