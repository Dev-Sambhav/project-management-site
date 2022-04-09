import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  // context object holding all the state value
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be use inside the AuthContextProvider"
    );
  }
  return context;
};
