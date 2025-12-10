import { useCallback, useEffect, useRef, useState } from "react";
import { State } from "../utils/state";

interface FetchResult<T> {
  result: State<T>;
  refresh: () => Promise<void>;
}

/**
 * A simple React Query-like hook for fetching data from APIs
 */
export function useFetch<T>(fetchFn: () => Promise<T>): FetchResult<T> {
  const [state, setState] = useState<State<T>>({ type: "loading" });

  // For memory safety
  const isMounted = useRef(true);
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!isMounted.current) return;

    setState({ type: "loading" });

    try {
      const result = await fetchFn();

      if (!isMounted.current) return;
      setState({ type: "success", data: result });
    } catch (error) {
      if (!isMounted.current) return;
      setState({ type: "error", error });
    }
  }, [fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { result: state, refresh: fetchData };
}
