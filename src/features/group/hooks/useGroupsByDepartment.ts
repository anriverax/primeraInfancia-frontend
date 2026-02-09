import { useApiQuery } from "@/shared/hooks/http/useApiQuery";
import type { GroupList } from "../groupType";

/**
 * Hook para obtener grupos por departamento usando el wrapper `useApiQuery` existente.
 * Solo dispara la petición cuando hay un `departmentId` válido.
 */
export const useGroupsByDepartment = (
  departmentId: string
): {
  groups: GroupList[];
  isLoading: boolean;
  isError: boolean;
} => {
  const dep = departmentId != null ? String(departmentId) : false;

  const { data, isLoading, isError } = useApiQuery<GroupList[]>({
    key: "groups-by-department",
    endpoint: dep ? `/group/me/groups-by-department/${dep}` : "/group/me/groups-by-department/none",
    enabled: Boolean(dep),
    description: "lista de grupos por departamento"
  });

  return {
    groups: data || [],
    isLoading,
    isError
  };
};
