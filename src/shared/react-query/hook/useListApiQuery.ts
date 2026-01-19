import { ApiQuery } from "@/shared/types/globals";
import { useApiQuery } from "./useApiQuery";

const useListApiQuery = <T>({ key, endpoint, enabled = false, description = "recursos" }: ApiQuery) => {
  const { data: data } = useApiQuery<T>({
    key,
    endpoint,
    enabled,
    description
  });

  return { data: data };
};

export { useListApiQuery };
