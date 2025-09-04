import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";
import { FetchResponseWithPagination, IPagination } from "../types/globals";
import useAxios from "./useAxios";
import { useEffect, useRef } from "react";
import { handleAxiosError } from "../utils/funtions";
import { TableWithPaginationResponse } from "../types/pagination";

export const useQueryRequest = <T>(
  key: string,
  endpoint: string,
  start: boolean,
  description: string,
  page?: number,
  limit?: number
): TableWithPaginationResponse<T> => {
  const queryClient = useQueryClient();
  const useRequest = useAxios(true);
  const hasHandledError = useRef(false);

  const endpointWithPage = page && limit ? `${endpoint}?page=${page}&limit=${limit}` : endpoint;

  const queryKey: string | (string | number)[] = [key];
  if (page !== undefined && limit !== undefined) {
    queryKey.push(page, limit);
  }

  const { data, error, isLoading, isError } = useQuery<{ data: T; meta: IPagination }>({
    queryKey,
    queryFn: async () => {
      const res: AxiosResponse<FetchResponseWithPagination<T>> = await useRequest.get(endpointWithPage);
      const { data, meta } = res.data;

      return { data, meta };
    },
    enabled: start,
    retry: false,
    placeholderData: (previousData) => previousData
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (error && !hasHandledError.current) {
      hasHandledError.current = true;
      handleAxiosError(isAxiosError(error), description, "obtener");
    }
  }, [error]);

  return { queryClient, data: data?.data as T, meta: data?.meta, isLoading, isError };
};
