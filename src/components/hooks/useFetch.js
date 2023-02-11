import { useState } from "react";

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  let data;
  const firebaseReq = async (req) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(req.url, req.options ? req.options : {});
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      data = await response.json();
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);

    return {
      isLoading,
      error,
      data,
    };
  };
  return firebaseReq;
};

export default useFetch;
