import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { DepartmentGroupCountResponse } from "../groupType";

const useDepartmentsList = (): {
  departmentListResult: DepartmentGroupCountResponse | undefined;
} => {
  // Firma actual: (key, endpoint, options)
  const { data: departmentListResult } = useApiQuery<DepartmentGroupCountResponse>({
    key: "departments-list",
    endpoint: "/group/me/departments-with-groups",
    enabled: true,
    description: "lista de departamentos"
  });

  return { departmentListResult };
};

export { useDepartmentsList };
