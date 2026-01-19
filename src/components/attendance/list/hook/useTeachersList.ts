import { TeachersAssignmentMentor } from "../../../components/attendance/attendance.type";
import { useListApiQuery } from "@/shared/react-query/hook/useListApiQuery";
import { useMemo } from "react";

const useTeachersList = (
  triggerId: number,
  debouncedValue: string
): { filteredTeachers: TeachersAssignmentMentor[] } => {
  const { data: teachersList } = useListApiQuery<TeachersAssignmentMentor[]>({
    key: `teacher-list-${triggerId}`,
    endpoint: `/attendance/me/teachers?responsible=${triggerId}`,
    enabled: !!triggerId,
    description: "listado de docentes asigandos"
  });

  const filteredTeachers = useMemo(() => {
    if (!teachersList) return [];
    if (!debouncedValue.trim()) return teachersList;

    const searchLower = debouncedValue.toLowerCase();
    return teachersList.filter((teacher) => teacher.fullName.toLowerCase().includes(searchLower));
  }, [teachersList, debouncedValue]);

  return {
    filteredTeachers: filteredTeachers || []
  };
};

export { useTeachersList };
