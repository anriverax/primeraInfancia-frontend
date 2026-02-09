import { useEffect } from "react";
import { FormikErrors } from "formik";
import { AttStepOneInput, EventList, SupportList } from "../../attendance.type";
import { useApiQuery } from "@/shared/hooks/http/useApiQuery";

const useAttSelectValues = (
  supportKey: string,
  eventKey: string,
  setFieldValue: (
    field: string,
    value: number,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<AttStepOneInput>>
): { supportList: SupportList[]; assignmentList: EventList[] } => {
  const { data: supportList } = useApiQuery<SupportList[]>({
    key: `support-list-${supportKey}`,
    endpoint: `/attendance/me/support?isResponsible=${supportKey}`,
    enabled: !!supportKey,
    description: "listado de soportes"
  });

  const { data: assignmentList } = useApiQuery<EventList[]>({
    key: `event-list-${eventKey}`,
    endpoint: `/attendance/me/events?responsible=${eventKey}`,
    enabled: !!eventKey,
    description: "listado de eventos"
  });

  useEffect(() => {
    if (supportList && supportList.length === 1) {
      setFieldValue("supportId", supportList[0].id);
    }
  }, [supportList, setFieldValue]);

  return {
    supportList: supportList || [],
    assignmentList: assignmentList || []
  };
};

export { useAttSelectValues };
