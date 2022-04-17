import { useCollection } from "../../hooks/useCollection";

// styles
import "./Dashboard.css";
// components
import ProjectList from "../../components/ProjectList";
const Dashboard = () => {
  const { documents: projects, error } = useCollection("projects");
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
};
export default Dashboard;
