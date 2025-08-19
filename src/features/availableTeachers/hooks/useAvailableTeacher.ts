import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { AvailableTeacherResult, AvailableTeacherResultWithPagination } from "../availableTeacherType";
import { useState } from "react";

const useAvailableTeacher = (zoneId: number, groupId: number): AvailableTeacherResultWithPagination => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data: availableTeacherList, meta } = useQueryRequest<AvailableTeacherResult[]>(
    `available-teacher-${zoneId}-${groupId}`,
    `/assign-person/typePerson/2/zoneId/${zoneId}`,
    true,
    "personas",
    page,
    limit
  );

  return {
    availableTeacherList: availableTeacherList || [],
    handleChangePage: setPage,
    meta
  };
};

export { useAvailableTeacher };
