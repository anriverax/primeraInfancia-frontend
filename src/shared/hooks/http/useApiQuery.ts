import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { FetchResponseWithPagination } from "../../types/globals";
import useAxios from "./useAxios";
import { handleAxiosError } from "../../utils/functions";
import { TableWithPaginationResponse } from "../../types/pagination";
import { useEffect, useRef } from "react";

type UseApiQueryOptions = {
  enabled?: boolean;
  page?: number;
  limit?: number;
  retry?: boolean | number;
  description?: string; // nombre del recurso para mensajes de error
};

type DataShape<T> = FetchResponseWithPagination<T>;

function buildEndpoint(base: string, page?: number, limit?: number): string {
  if (page !== undefined && limit !== undefined) {
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}page=${page}&limit=${limit}`;
  }
  return base;
}

export const useApiQuery = <T>(
  key: string,
  endpoint: string,
  { enabled = true, page, limit, retry = 1, description = "recurso" }: UseApiQueryOptions = {}
): TableWithPaginationResponse<T> => {
  const queryClient = useQueryClient();
  const axiosClient = useAxios(true);
  const resolvedEndpoint = buildEndpoint(endpoint, page, limit);
  const hasHandledError = useRef(false);
  const queryKey = ["api", key, endpoint, page ?? null, limit ?? null];

  //const { data, error, isLoading, isError } = useQuery<{ data: T }>({
  const query = useQuery<DataShape<T>>({
    queryKey,
    queryFn: async () => {
      const res: AxiosResponse<FetchResponseWithPagination<T>> = await axiosClient.get(resolvedEndpoint);
      return res.data;
    },
    enabled,
    retry,
    placeholderData: (previousData) => previousData,
    select: (raw) => raw // aquí podrías normalizar
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (query.error && !hasHandledError.current) {
      hasHandledError.current = true;
      handleAxiosError(query.error, description, "obtener");
    }
  }, [query.error]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return {
    queryClient,
    data: query.data as T, // si esperas array
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isError: query.isError
  };
};

export function invalidateApiQuery(queryClient: QueryClient, key: string) {
  return queryClient.invalidateQueries({ queryKey: ["api", key] });
}
