import { useState, useEffect } from "react";
import {
  projectAuth,
  googleProvider,
  projectFirestore,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useGoogle = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const googleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await projectAuth.signInWithPopup(googleProvider);
      // checking user is valid or not
      if (!res) {
        throw new Error("User does not Exists");
      }

      // short the user name
      const longName = res.user.displayName;
      const names = longName.split(' ');
      const shortName = names[0];


      // create a user document
      await projectFirestore.collection("users").doc(res.user.uid).set({
        online: true,
        displayName:shortName,
        photoURL:res.user.photoURL,
      });

      // dispatch the user data globally
      dispatch({ type: "SIGNUP", payload: res.user });

      // send welcome message
      // console.log("Email:-",res.user.email);

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
  return { error, isLoading, googleSignIn };
};