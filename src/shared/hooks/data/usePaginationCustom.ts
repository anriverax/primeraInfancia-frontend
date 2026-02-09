import { useMemo, useState } from "react";

const usePaginationCustom = <T>(
  data: T[]
): {
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
  prev: number | null;
  next: number | null;
  paginatedData: T[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
} => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const meta = useMemo(() => {
    const total = data.length;
    const lastPage = Math.ceil(total / limit);
    const skip = (page - 1) * limit;
    const paginatedData = data.slice(skip, skip + limit);

    return {
      total,
      currentPage: page,
      perPage: limit,
      lastPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
      paginatedData,
      setPage
    };
  }, [page, data]);

  return meta;
};

export { usePaginationCustom };
