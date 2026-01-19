import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { showToast } from "../utils/functions";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // No reintentar 401/403/404
        if (error instanceof AxiosError && [401, 403, 404].includes(error.response?.status || 0)) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false, // desactiva refetch al volver al tab
      staleTime: 1000 * 60 * 60 * 6, // 6 horas
      gcTime: 1000 * 60 * 10 // 10 minutos
    },
    mutations: {
      retry: 1,
      /* eslint-disable @typescript-eslint/no-explicit-any */
      onError: (error) => {
        // Handler global para mutations
        if (axios.isAxiosError(error)) {
          showToast(error.response?.data?.message || "Error", "danger");
        }
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }
  }
});
