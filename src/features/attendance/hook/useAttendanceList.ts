import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { useState } from "react";
import { AttendanceListResult, IAttendanceTable } from "../attendance.type";

const useAttendanceList = (): AttendanceListResult => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data: attendanceList, meta } = useApiQuery<IAttendanceTable[]>(
    "attendance-list",
    "/attendance",
    {
      enabled: true,
      description: "Lista de asistencias",
      page,
      limit
    }
  );

  return { handleChangePage: setPage, attendanceList, meta };
};

export { useAttendanceList };
