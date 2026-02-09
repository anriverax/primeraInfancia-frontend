import { TeachersAssignmentMentor } from "@/components/attendance/attendance.type";
import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { SharedSelection } from "@heroui/react";
import { useMemo } from "react";

const useTeachersList = (
  triggerId: number,
  debouncedValue: string,
  handleSelectTeacher: (_keys: number[]) => void,
  existingTeachers: number[] = []
): {
  filteredTeachers: TeachersAssignmentMentor[];
  handleSelectionChange: (keys: SharedSelection, limitCount: number) => void;
} => {
  const { data: teachersList } = useApiQuery<TeachersAssignmentMentor[]>({
    key: `teacher-list-${triggerId}`,
    endpoint: "plannedEvent/teachers/user",
    enabled: !!triggerId,
    description: "listado de docentes asignados"
  });

  const filteredTeachers = useMemo(() => {
    if (!teachersList) return [];

    // Filtrar profesores que ya existen
    const availableTeachers = teachersList.filter((teacher) => !existingTeachers.includes(teacher.id));

    if (!debouncedValue.trim()) return availableTeachers;

    const searchLower = debouncedValue.toLowerCase();
    return availableTeachers.filter((teacher) => teacher.fullName.toLowerCase().includes(searchLower));
  }, [teachersList, debouncedValue, existingTeachers]);

  const handleSelectionChange = (keys: SharedSelection, limitCount: number): void => {
    const selectedIds = Array.from(keys as Iterable<unknown>)
      .map((k) => Number(k))
      .filter((n) => !isNaN(n));

    const limitedSelection = limitCount <= 2 ? selectedIds.slice(-limitCount) : selectedIds;

    handleSelectTeacher(limitedSelection);
  };

  return {
    filteredTeachers: filteredTeachers || [],
    handleSelectionChange
  };
};

export { useTeachersList };
