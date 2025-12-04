import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { TeachersAssignmentMentor } from "../attendance.type";

const useTeachersList = (): { teachersList: TeachersAssignmentMentor[] } => {
  const { data: teachersList } = useApiQuery<TeachersAssignmentMentor[]>(
    "teacherAssignment-list",
    "/attendance/me/teachers",
    {
      enabled: true,
      description: "listado de docentes asigandos"
    }
  );

  return {
    teachersList
  };
};

export { useTeachersList };
