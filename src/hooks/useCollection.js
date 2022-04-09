import { useEffect, useState, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collectionName, _query, _order) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // for avoiding infinite loop
  // _query is an array and its different on every function call
  const query = useRef(_query).current;
  const order = useRef(_order).current;

  useEffect(() => {
    setIsLoading(true);
    let ref = projectFirestore.collection(collectionName);
    // checking query
    if (query) {
      ref = ref.where(...query);
    }
    // checking order
    if (order) {
      ref = ref.orderBy(...order);
    }
    const unsub = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setIsLoading(false);
          setError("No transactions to load");
        } else {
          const results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });

          // update state
          setDocuments(results);
          setIsLoading(false);
          setError(null);
        }
      },
      (err) => {
        setError(err.message);
        setIsLoading(false);
        setDocuments(null);
      }
    );

    // unsubscribe on unmount
    return () => unsub();
  }, [collectionName, query, order]);
  return { documents, error, isLoading };
};
