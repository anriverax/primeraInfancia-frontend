import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { PersonByTypePersonResult } from "../groupDetailType";
import { useDeleteRequest } from "@/shared/hooks/useDeleteRequest";

const usePersonByTypePerson = (
  zoneId: number,
  groupId: number
): {
  personList: PersonByTypePersonResult[];
  handleConfirmDeleteLeader: (_leaderId: number) => Promise<void>;
} => {
  const { data: personList } = useQueryRequest<PersonByTypePersonResult[]>(
    `persons-list-select-${zoneId}-${groupId}`,
    `/assign-person/typePerson/4/zoneId/${zoneId}`,
    true,
    "personas"
  );
  const { onConfirmDelete } = useDeleteRequest(`group-detail-${groupId}`, "/group-leader", "personas");

  const handleConfirmDeleteLeader = async (leaderId: number): Promise<void> => {
    await onConfirmDelete(
      leaderId,
      `Al desactivar el formador del grupo, se desactivarán algunos procesos relacionados con el grupo.`
    );
  };

  return {
    personList: personList || [],
    handleConfirmDeleteLeader
  };
};

export { usePersonByTypePerson };
