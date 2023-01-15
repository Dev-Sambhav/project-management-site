import { useEffect, useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useHistory } from "react-router-dom";

// styles
import "./Create.css";

const categories = [
  { value: "Development", label: "Development" },
  { value: "Design", label: "Design" },
  { value: "Sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
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
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore("projects");
  const history = useHistory();

  // fetching all the users and make a new users object with label and value props
  useEffect(() => {
    if (documents) {
      const option = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(option);
    }
  }, [documents]);

  // submit form to firebase
  const handleSubmit = async (e) => {
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

    // project admin details
    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
      photoURL: user.photoURL,
    };

    // assign to user
    const assignedUsersList = assignedUsers.map((assignUser) => {
      return {
        displayName: assignUser.value.displayName,
        id: assignUser.value.id,
        photoURL: assignUser.value.photoURL,
      };
    });

    // if there is no error create a project collection which contain all the info of project
    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };
    // adding project object into firestore
    await addDocument(project);
    if (!response.error) {
      history.push("/");
    }
  };
  return (
    <>
      <h2 className="page-title">Create a New Project</h2>
      <div className="create-form">
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
          {response.isLoading && (
            <button className="btn" disabled>
              Adding...
            </button>
          )}
          {!response.isLoading && <button className="btn">Add Project</button>}
          {formErrors && <p className="error">{formErrors}</p>}
        </form>
      </div>
    </>
  );
};

export default Create;
