import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { useState } from "react";
import { AttendanceListResult, EventList } from "../attendance.type";

const useAttendanceList = (): AttendanceListResult => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data: attendanceList, meta } = useApiQuery<EventList[]>("event-list", "/event", {
    enabled: true,
    description: "Lista de asistencias",
    page,
    limit
  });

  return { handleChangePage: setPage, attendanceList, meta };
};

export { useAttendanceList };
