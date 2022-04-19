const filterList = [
  "All",
  "Mine",
  "Development",
  "Design",
  "Marketing",
  "Sales",
];

const ProjectFilter = ({changeFilter, currentFilter}) => {
  const handleFilter = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter By: </p>
        {filterList.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilter(filter)}
            className={currentFilter === filter ? "active" : ""}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
