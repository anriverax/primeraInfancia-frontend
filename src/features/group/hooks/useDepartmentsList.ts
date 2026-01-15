import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { DepartmentGroupCountResponse } from "../groupType";

const useDepartmentsList = (): {
  departmentListResult: DepartmentGroupCountResponse | undefined;
} => {
  // Firma actual: (key, endpoint, options)
  const { data: departmentListResult } = useApiQuery<DepartmentGroupCountResponse>(
    "departments-list",
    "/group/me/departments-with-groups",
    { enabled: true, description: "lista de departamentos" }
  );

  return { departmentListResult };
};

export { useDepartmentsList };
