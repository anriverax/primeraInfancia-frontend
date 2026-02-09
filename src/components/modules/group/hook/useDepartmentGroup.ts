import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import { DepartmentGroupList } from "../group.type";
import { useMemo } from "react";

const useDepartmentGroup = (): {
  dptGroupcolumns: DepartmentGroupList[][];
  isLoading: boolean;
} => {
  const { data: departGroupList, isLoading } = useApiQuery<DepartmentGroupList[]>({
    key: "departGroup-list",
    endpoint: "/group",
    enabled: true,
    description: "Lista de grupos por departamento"
  });

  const dptGroupcolumns = useMemo(() => {
    if (!departGroupList) return [[], []];
    const total = departGroupList.length;
    const size = Math.ceil(total / 2);
    return [departGroupList.slice(0, size), departGroupList.slice(size, total)];
  }, [departGroupList]);

  return { dptGroupcolumns, isLoading };
};
export { useDepartmentGroup };
