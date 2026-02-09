import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { PlannedEventTeachers, PlannedEventType } from "../agenda.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const usePlannedEvent = (
  plannedId: number,
  key: string,
  endpoint: string
): {
  plannedEventData: PlannedEventType | PlannedEventTeachers;
  isLoading: boolean;
  refetch: any;
} => {
  const {
    data: plannedEventData,
    isLoading,
    refetch
  } = useApiQuery<PlannedEventType>({
    key,
    endpoint,
    enabled: Boolean(plannedId && plannedId !== -1),
    description: "evento planificado"
  });

  return {
    plannedEventData: plannedEventData as PlannedEventType | PlannedEventTeachers,
    isLoading,
    refetch
  };
};
/* eslint-enable @typescript-eslint/no-explicit-any */
