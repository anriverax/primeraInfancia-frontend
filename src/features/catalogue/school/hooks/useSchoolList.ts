import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { useState } from "react";
import { ISchoolTable, SchoolListResult } from "../schoolType";

const useSchoolList = (): SchoolListResult => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data: schoolList, meta } = useApiQuery<ISchoolTable[]>("schools-list", "/catalogue/school", {
    enabled: true,
    description: "centros escolares",
    page,
    limit
  });

  const schoolListData = schoolList || [];

  return { handleChangePage: setPage, schoolList: schoolListData, meta };
};

export { useSchoolList };
