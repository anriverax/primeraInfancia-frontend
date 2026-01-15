import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { SupportList } from "../attendance.type";

const useSupportList = (trigger: string): { supportList: SupportList[] } => {
  const { data: supportList } = useApiQuery<SupportList[]>(
    `support-list-${trigger}`,
    `/attendance/me/support?isResponsible=${trigger}`,
    {
      enabled: !!trigger,
      description: "listado de soportes"
    }
  );

  return {
    supportList: supportList || []
  };
};

export { useSupportList };
