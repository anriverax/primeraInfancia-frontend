import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { TeachersAssignmentMentor } from "../../../components/attendance/attendance.type";

const useTeachersList = (triggerId: string): { teachersList: TeachersAssignmentMentor[] } => {
  const { data: teachersList } = useApiQuery<TeachersAssignmentMentor[]>(
    `teacher-list-${triggerId}`,
    `/attendance/me/teachers?responsible=${triggerId}`,
    {
      enabled: !!triggerId,
      description: "listado de docentes asigandos"
    }
  );

  return {
    teachersList
  };
};

export { useTeachersList };
