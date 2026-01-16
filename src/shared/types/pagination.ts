import { QueryClient } from "@tanstack/react-query";
import { IPagination } from "./globals";

export interface TableWithPaginationResponse<T> {
  queryClient: QueryClient;
  data: T | undefined;
  meta: IPagination | undefined;
  isLoading: boolean;
  isError: boolean;
}
