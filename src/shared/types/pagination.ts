import { QueryClient } from "@tanstack/react-query";
import { IPagination } from "./globals";

export interface TableWithPaginationResponse<T> {
  queryClient: QueryClient;
  data: T;
  meta: IPagination | undefined;
  isLoading: boolean;
  isError: boolean;
  onConfirmDelete: (_id: number, _info: string) => Promise<boolean>;
}
