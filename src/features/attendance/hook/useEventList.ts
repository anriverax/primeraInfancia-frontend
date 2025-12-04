import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { EventList } from "../attendance.type";

const useEventList = (): { assignmentList: EventList[] } => {
  const { data: assignmentList } = useApiQuery<EventList[]>("event-list", "/events", {
    enabled: true,
    description: "listado de eventos"
  });

  return {
    assignmentList
  };
};

export { useEventList };
