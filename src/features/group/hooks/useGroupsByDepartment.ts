import { useApiQuery } from "@/shared/hooks/useApiQuery";
import type { IGroupTable } from "../groupType";

/**
 * Hook para obtener grupos por departamento usando el wrapper `useApiQuery` existente.
 * Solo dispara la petición cuando hay un `departmentId` válido.
 */
export const useGroupsByDepartment = (departmentId: string) => {
  const dep = departmentId != null ? String(departmentId) : undefined;

  const { data, isLoading, isError } = useApiQuery<IGroupTable[]>(
    "groups-by-department",
    dep ? `/group/me/groups-by-department/${dep}` : "/group/me/groups-by-department/none",
    {
      enabled: Boolean(dep),
      description: "lista de grupos por departamento"
    }
  );

  return {
    groups: data,
    isLoading,
    isError
  };
};
