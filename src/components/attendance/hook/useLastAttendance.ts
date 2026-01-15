import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { LastAttendance } from "../attendance.type";

const useLastAttendance = (): LastAttendance | null => {
  const { data: lastAttendance } = useApiQuery<LastAttendance>("last-attendance", "/attendance/last", {
    enabled: true,
    description: "última asistencia"
  });

  return lastAttendance || null;
};

export { useLastAttendance };
