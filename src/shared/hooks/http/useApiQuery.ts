import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ApiQuery, DataShape, IPagination } from "../../types/globals";
import useAxios from "./useAxios";
import { handleAxiosError } from "../../utils/functions";
import { TableWithPaginationResponse } from "../../types/pagination";
import { useEffect, useRef } from "react";
import { queryClient } from "@/shared/config/reactQueryClient";

const buildEndpoint = (base: string, page?: number, limit?: number): string => {
  if (page !== undefined && limit !== undefined) {
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}page=${page}&limit=${limit}`;
  }
  return base;
};

export const useApiQuery = <T>({
  key,
  endpoint,
  enabled = false,
  description = "recursos",
  pagination: { page, limit } = {}
}: ApiQuery): TableWithPaginationResponse<T> => {
  const queryClient = useQueryClient();
  const axiosClient = useAxios(true);
  const resolvedEndpoint = buildEndpoint(endpoint, page, limit);
  const hasHandledError = useRef(false);
  const queryKey = ["api", key];

  if (page) {
    queryKey.push(page.toString());
  }

  const { data, error, isLoading, isError, refetch } = useQuery<{ data: T; meta?: IPagination }>({
    queryKey,
    queryFn: async () => {
      const res: AxiosResponse<DataShape<T>> = await axiosClient.get(resolvedEndpoint);
      const payload = res.data;

      if (payload && typeof payload === "object" && "data" in payload) {
        const { data, meta } = payload as DataShape<T>;
        return { data, meta };
      }

      return { data: payload as T, meta: undefined };
    },
    enabled,
    retry: false,
    placeholderData: (previousData) => previousData
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (error && !hasHandledError.current) {
      hasHandledError.current = true;
      handleAxiosError(error, description, "obtener");
    }
  }, [error, description, handleAxiosError]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { queryClient, data: data?.data as T, meta: data?.meta, isLoading, isError, refetch };
};

export async function invalidateApiQuery(key: string): Promise<void> {
  return await queryClient.invalidateQueries({ queryKey: ["api", key] });
}
