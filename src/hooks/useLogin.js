import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);

    try {
      // login the user
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      // checking user is valid or not
      if (!res) {
        throw new Error("User does not Exists");
      }
      dispatch({ type: "LOGIN", payload: res.user });
      // update state
      if (!isCancelled) {
        setError(null);
        setIsLoading(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isLoading, login };
};

export default useLogin;
