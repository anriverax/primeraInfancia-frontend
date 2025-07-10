// hooks/useMenuItems.ts
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { FetchResponse } from "../types/globals";
import useAxios from "./useAxios";

export const useQueryRequest = <T>(key: string, endpoint: string, start: boolean) => {
  const useRequest = useAxios(true);
  return useQuery<T, AxiosError, T, [string]>({
    queryKey: [key],
    queryFn: async () => {
      const res: AxiosResponse<FetchResponse<T>> = await useRequest.get(endpoint);

      return res.data.data;
    },
    enabled: start,
    retry: false
  });
};
