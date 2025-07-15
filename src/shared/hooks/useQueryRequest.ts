import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { FetchResponse, FetchResponseWithPagination, IPagination } from "../types/globals";
import useAxios from "./useAxios";
import { useCallback, useEffect, useRef } from "react";
import { confirmDelete, handleAxiosError } from "../utils/funtions";
import Swal from "sweetalert2";
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
  console.log([key, page, limit]);
  const { data, error, isLoading, isError } = useQuery<{ data: T; meta: IPagination }>({
    queryKey: [key, page, limit],
    queryFn: async () => {
      const res: AxiosResponse<FetchResponseWithPagination<T>> = await useRequest.get(endpointWithPage);
      const { data, meta } = res.data;

      return { data, meta };
    },
    enabled: start,
    retry: false
  });

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (error && !hasHandledError.current) {
      hasHandledError.current = true;
      handleAxiosError(isAxiosError(error), description, "obtener");
    }
  }, [error]);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        const res: AxiosResponse<FetchResponse<void>> = await useRequest.delete(
          `${endpoint}/delete/${id}`
        );
        const { statusCode, message } = res.data;

        if (statusCode === HttpStatusCode.Ok) {
          Swal.fire({
            title: "!Eliminado!",
            text: String(message),
            icon: "success"
          });

          // Update cached data manually
          queryClient.invalidateQueries({ queryKey: [key] });
        }
      } catch (error) {
        handleAxiosError(error, description, "eliminar");
      }
    },
    [useRequest]
  );

  const onConfirmDelete = async (id: number, info: string): Promise<boolean> => {
    const confirmed = await confirmDelete({
      text: info
    });
    if (confirmed) {
      await handleDelete(id);
      return true;
    }

    return false;
  };

  return { queryClient, data: data?.data as T, meta: data?.meta, isLoading, isError, onConfirmDelete };
};
