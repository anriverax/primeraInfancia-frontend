import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { SelectList } from "@/shared/types/globals";

const useAgendaSelectValues = (): {
  trainingModuleList: SelectList[];
  assignmentList: SelectList[];
} => {
  const { data: trainingModuleList } = useApiQuery<SelectList[]>({
    key: `trainingModule-list`,
    endpoint: "/plannedEvent/training-modules",
    enabled: true,
    description: "listado de módulos de formación"
  });

  const { data: assignmentList } = useApiQuery<SelectList[]>({
    key: "eventInstance-list",
    endpoint: "/plannedEvent/event-instances/user",
    enabled: true,
    description: "listado de eventos asignados al usuario"
  });

  return {
    trainingModuleList: trainingModuleList || [],
    assignmentList: assignmentList || []
  };
};

export { useAgendaSelectValues };
