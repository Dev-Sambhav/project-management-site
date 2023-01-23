import { useState } from "react";
import { projectFirestore, timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Input, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';


const SendMessage = ({ scroll }) => {
  const [msg, setMsg] = useState("");
  const { user } = useAuthContext();

  const sendMessage = async (e) => {
    e.preventDefault();

    await projectFirestore.collection("messages").add({
      name : user.displayName,
      text: msg,
      photoURL: user.photoURL,
      uid: user.uid,
      createdAt: timestamp.fromDate(new Date()),
    });
    setMsg("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="SendMessageBox">
      <form onSubmit={sendMessage}>
        <div className="sendMsg">
          <Input
            style={{
              width: "100%",
              fontSize: "18px",
              fontWeight: "550",
              marginLeft: "5px",
              marginBottom: "-3px",
              color: "#fff",
            }}
            placeholder="Message..."
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <Button
            style={{
              width: "18%",
              fontSize: "15px",
              fontWeight: "550",
              margin: "4px 5% -13px 5%",
              maxWidth: "200px",
              marginLeft: "20px",
              color: "#B4FF9F",
            }}
            type="submit"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMessage;
