import { projectAuth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsLoading(true);
    try {
      // signup the user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      // check res is valid or not
      if (!res) {
        throw new Error("Couldn't Sign the user");
      }

      // add displayName to user
      await res.user.updateProfile({ displayName });

      // dispatch the user data globally
      dispatch({ type: "SIGNUP", payload: res.user });

      // update state
      if (!isCancelled) {
        setIsLoading(false);
        setError(null);
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

  return { error, isLoading, signup };
};
