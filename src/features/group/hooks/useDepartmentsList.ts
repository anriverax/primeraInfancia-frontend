import { useApiQuery } from "@/shared/hooks/useApiQuery";
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
  console.log(departmentListResult);
  return { departmentListResult };
};

export { useDepartmentsList };
