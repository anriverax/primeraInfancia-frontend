import { ApiQuery, IPagination } from "@/shared/types/globals";
import { Dispatch, SetStateAction, useState } from "react";
import { useApiQuery } from "../../hooks/http/useApiQuery";

const usePaginationApiQuery = <T>({
  key,
  endpoint,
  enabled,
  description
}: ApiQuery): {
  handleChangePage: Dispatch<SetStateAction<number>>;
  data: never[] | NonNullable<T>;
  meta: IPagination | undefined;
} => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data: dataList, meta } = useApiQuery<T>({
    key,
    endpoint,
    enabled,
    description,
    pagination: { page, limit }
  });

  return { handleChangePage: setPage, data: dataList || [], meta };
};

export { usePaginationApiQuery };
