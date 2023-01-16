import { useState, useRef } from "react";
import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import Avatar from "../../components/Avatar";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ProjectComments = ({ project }) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const scroll = useRef();
  const { updateDocument, response } = useFirestore("projects");

  // submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };
    // sending comment details to firebase
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    scroll.current.scrollIntoView({ behavior: "smooth" });
    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <div className="project-comments">
      {/* <h4>Project Comments</h4> */}
      <ul className="project-chat">
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li key={comment.id}>
              <div className="comment-author">
                <Avatar src={comment.photoURL} />
                <p>{comment.displayName}</p>
              </div>
              <div className="comment-date">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="comment-content">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
          <div ref={scroll}></div>
      </ul>
      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>
        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
};

export default ProjectComments;
