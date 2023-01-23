import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
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
      // console.log(res);
      // update the user online status
      await projectFirestore.collection("users").doc(res.user.uid).update({
        online: true,
      });

      dispatch({ type: "LOGIN", payload: res.user });
      // update state
      if (!isCancelled) {
        setError(null);
        setIsLoading(false);
      }
    } catch (err) {
      if (!isCancelled) {
        if (err.code === "auth/user-not-found")
          setError("User doesn't exists");
        if(err.code === 'auth/wrong-password') setError("Password is Invalid")
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isLoading, login };
};
