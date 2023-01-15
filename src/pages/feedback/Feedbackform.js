import { useState } from "react";
// css
import "./Feedback.css";
import SendFeedback from "./SendFeedback";
const Feedback = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFeedback((prevFeedback) => ({ ...prevFeedback, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    SendFeedback(feedback);
  };

  return (
    <form className="feedback" onSubmit={handleSubmit}>
      <h2 className="page-title">Feedback</h2>
      <label>
        <span>Name:</span>
        <input
          type="text"
          name="name"
          value={feedback.name}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          type="email"
          name="email"
          value={feedback.email}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Message:</span>
        <textarea
          name="message"
          value={feedback.message}
          onChange={handleChange}
        />
      </label>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
};
export default Feedback;
