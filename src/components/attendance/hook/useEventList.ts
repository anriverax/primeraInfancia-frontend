import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { EventList } from "../attendance.type";

const useEventList = (triggerId: string): { assignmentList: EventList[] } => {
  const { data: assignmentList } = useApiQuery<EventList[]>(
    `event-list-${triggerId}`,
    `/attendance/me/events?responsible=${triggerId}`,
    {
      enabled: !!triggerId,
      description: "listado de eventos"
    }
  );

  return {
    assignmentList: assignmentList || []
  };
};

export { useEventList };
