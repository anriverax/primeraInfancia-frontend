import { QueryClient } from "@tanstack/react-query";
import { IPagination } from "./globals";
/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TableWithPaginationResponse<T> {
  queryClient: QueryClient;
  data: T;
  meta: IPagination | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
