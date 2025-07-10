import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false, // desactiva refetch al volver al tab
      staleTime: 1000 * 60 * 60 * 6 // 6 horas
    }
  }
});
