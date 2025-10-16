import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { useState } from "react";

const useAttendanceList = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data: attendanceList, meta } = useQueryRequest<any[]>(
    "attendance-list",
    "/catalogue/school",
    true,
    "Lista de asistencias",
    page,
    limit
  );

  return { handleChangePage: setPage, attendanceList, meta };
};

export { useAttendanceList };
