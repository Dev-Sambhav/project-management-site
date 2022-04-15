import { useEffect, useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";

// styles
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

const Create = () => {
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formErrors, setFormErrors] = useState(null);

  // fetching all the users and make a new users object with label and value props
  useEffect(() => {
    if (documents) {
      const option = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(option);
    }
  }, [documents]);

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(null);
    // handling errors
    if (!category) {
      setFormErrors("Please select a project category");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormErrors("Please assign the project to at least one user");
      return;
    }
    console.log(name, details, dueDate, category.value, assignedUsers);
  };
  return (
    <div className="create-form">
      <h2 className="page-title">Create a New Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Set Due Date:</span>
          <input
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
            defaultValue={category}
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        <button className="btn">Add Project</button>
        {formErrors && <p className="error">{formErrors}</p>}
      </form>
    </div>
  );
};

export default Create;
