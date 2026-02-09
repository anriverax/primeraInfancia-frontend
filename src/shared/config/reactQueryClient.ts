import { QueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { showToast } from "../utils/functions";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount: number, error: AxiosError) => {
        // Do not retry 401/403/404
        if (error instanceof AxiosError && [401, 403, 404].includes(error.response?.status || 0)) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false, // disable refetch on window focus
      staleTime: 1000 * 60 * 60 * 6, // 6 hours
      gcTime: 1000 * 60 * 10 // 10 minutes
    },
    mutations: {
      retry: 1,
      /* eslint-disable  */
      onError: (error) => {
        // Global handler for mutations
        if (axios.isAxiosError(error)) {
          showToast(error.response?.data?.message || "Error", "danger");
        }
      }
    }
  }
});
/* eslint-enable @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any */
