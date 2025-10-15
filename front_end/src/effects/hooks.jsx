import mapJobEntry from "@/utils/mapper";
import { protectedGetRequest } from "@/utils/requests";
import { useEffect, useState } from "react";

const useEntriesHook = (endpoint) => {
  const [entries, setEntries] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await protectedGetRequest(endpoint);
        if (response.error) {
          throw new Error(response.error.message);
        }
        const data = response.data.jobEntries.map(mapJobEntry);
        setEntries(data);
        setLoading(false)
      } catch (error) {
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return { entries, fetchError, loading, setLoading, setEntries };
};





export { useEntriesHook };
