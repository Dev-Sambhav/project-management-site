import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import SendMessage from "./SendMessage";
import "./ChatRoom.css";

const ChatRoom = () => {
  const { user } = useAuthContext();
  const scroll = useRef();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    projectFirestore
      .collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        const results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data() });
        });
        setMessages(results);
      });
  }, []);
  console.log({ messages });
  return (
    <div className="chat-room">
      <div className="message-box">
        {messages.map(({ id, text, photoURL, uid }) => (
          <div>
            <div
              key={id}
              className={`message ${
                uid === user.uid ? "sent" : "received"
              }`}
            >
              <img src={photoURL} alt="" />
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
};

export default ChatRoom;
