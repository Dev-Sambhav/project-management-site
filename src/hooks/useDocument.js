import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // fetching a single document
  useEffect(() => {
    setIsLoading(true);
    const ref = projectFirestore.collection(collectionName).doc(id);
    const unsub = ref.onSnapshot(
      (snapshot) => {
        setDocument({ ...snapshot.data(), id: snapshot.id });
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        console.log(err.message);
        setError("Failed to load document");
        setIsLoading(false);
      }
    ); 
    // cleanup function on unmount
    return () => unsub();
  }, [collectionName, id]);

  return { document, error, isLoading };
};
