import { useCallback, useEffect, useState } from "react";

export type TUseFetchProps<T> = {
  fetcher: () => Promise<T>;
};

const useFetch = <T>({ fetcher }: TUseFetchProps<T>) => {
  const [data, setData] = useState<T>();
  const [errors, setErrors] = useState<Error>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await fetcher();
      setData(resp);
    } catch (er) {
      setErrors(er as Error);
    } finally {
      setIsLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, errors, isLoading };
};

export default useFetch;
