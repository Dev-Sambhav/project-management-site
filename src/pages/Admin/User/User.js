import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "../../../components/Avatar"
import "./User.css";
import { useCollection } from "../../../hooks/useCollection";
import { Button } from "@mui/material";
import { projectFirestore, admin } from "../../../firebase/config";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function User() {
  const { documents: users, error, isLoading } = useCollection
  ("users");
  const handleDelete = async (id) => {
    // delete user
    admin.auth().deleteUser(id)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user: ", error);
    });

    // delete user document
    projectFirestore.collection("users").doc(id).delete()
    .then(() => {
      console.log("User document deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user document: ", error);
    });
    
  };
  
  return (
    <>
      {isLoading && <div>Loading users...</div>}
      {error && <div className="error">{error}</div>}
      {users && (
        <Box sx={{ flexGrow: 1 }} className="card">
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {users.map((user) => (
              <Grid item>
                <Item className="card-box">
                  <Avatar
                    src={user.photoURL}
                    className="card-img"
                    alt="user-img"
                  />
                  <div className="card-content">
                    <p className="user-name">Name:- {user.displayName}</p>
                    <p className="user-status">
                      Status:- {user.online ? "Online" : "Offline"}
                    </p>
                  </div>
                  <div className="card-button">
                    <Button
                      variant="outlined"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
