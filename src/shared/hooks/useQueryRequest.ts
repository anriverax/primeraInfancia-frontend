// hooks/useMenuItems.ts
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import { FetchResponse } from "../types/globals";
import useAxios from "./useAxios";
import { useEffect, useRef } from "react";
import { handleAxiosError } from "../utils/funtions";

export const useQueryRequest = <T>(
  key: string,
  endpoint: string,
  start: boolean,
  description: string
): { data: NoInfer<T> | undefined; isLoading: boolean; isError: boolean } => {
  const useRequest = useAxios(true);
  const hasHandledError = useRef(false);
  const { data, error, isLoading, isError } = useQuery<T>({
    queryKey: [key],
    queryFn: async () => {
      const res: AxiosResponse<FetchResponse<T>> = await useRequest.get(endpoint);

      return res.data.data;
    },
    enabled: start,
    retry: false
  });

  useEffect(() => {
    if (error && !hasHandledError.current) {
      hasHandledError.current = true;
      handleAxiosError(isAxiosError(error), description, "obtener");
    }
  }, [error]);

  return { data, isLoading, isError };
};
