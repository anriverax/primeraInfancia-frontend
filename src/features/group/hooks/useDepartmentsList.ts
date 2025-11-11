import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { DepartmentList } from "../groupType";

type SelectedIds = string[];

const useDepartmentsList = (): {
  departmentList: DepartmentList[] | undefined;
} => {
  // Estado controlado por los Accordions (Selection puede ser Set<string> o 'all')

  // Firma actual: (key, endpoint, options)
  const { data: departmentList } = useApiQuery<DepartmentList[]>(
    "departments-list",
    "/catalogue/department",
    { enabled: true, description: "lista de departamentos" }
  );

  return { departmentList };
};

export { useDepartmentsList };
