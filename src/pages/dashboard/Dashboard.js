import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

// styles
import "./Dashboard.css";
// components
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
const Dashboard = () => {
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("All");
  const { user } = useAuthContext();

  // change category
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  // filter category and list the project according to selected category
  const projects =
    documents &&
    documents.filter((document) => {
      switch (currentFilter) {
        case "All":
          return true;
        case "Mine":
          let assignedToMe = false;
          document.assignedUsersList.map((u) => {
            if (user.uid === u.id) {
              assignedToMe = true;
            }
          });
          return assignedToMe;
        case "Development":
        case "Design":
        case "Marketing":
        case "Sales":
          return document.category === currentFilter;
      }
    });

  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">No Projects Yet!</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
};
export default Dashboard;
