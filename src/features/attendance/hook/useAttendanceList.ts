import { TeachersAssignmentWithEvents } from "../attendance.type";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";

const useAttendanceList = () => {
  const { data: assignmentList } = useQueryRequest<any>(
    "teachers-with-events",
    "/attendance/teachersWithEvents",
    true,
    "listado de eventos"
  );

  return { assignmentList: assignmentList as TeachersAssignmentWithEvents };
};

export { useAttendanceList };
