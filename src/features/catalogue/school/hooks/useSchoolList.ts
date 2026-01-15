import { useQueryRequest } from "@/shared/hooks/http/useApiQuery";
import { useState } from "react";
import { ISchoolTable, SchoolListResult } from "../schoolType";

const useSchoolList = (): SchoolListResult => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data: schoolList, meta } = useQueryRequest<ISchoolTable[]>(
    "schools-list",
    "/catalogue/school",
    true,
    "centros escolares",
    page,
    limit
  );

  return { handleChangePage: setPage, schoolList, meta };
};

export { useSchoolList };
