import { GroupListResult, IGroupTable } from "../groupType";
import { useDeleteRequest } from "@/shared/hooks/data/useDeleteRequest";
import { usePaginationApiQuery } from "@/shared/hooks/http/usePaginationApiQuery";

const useGroupsList = (): GroupListResult => {
  const {
    data: groupList,
    meta,
    handleChangePage
  } = usePaginationApiQuery<IGroupTable[]>({
    key: "groups-list",
    endpoint: "/group",
    enabled: true,
    description: "grupos"
  });

  const { onConfirmDelete } = useDeleteRequest("groups-list", "/group", "grupo");

  const handleConfirmDeleteGroup = async (groupId: number, groupName: string): Promise<void> => {
    await onConfirmDelete(
      groupId,
      `Al eliminar el grupo: ${groupName}, también se eliminarán los usuarios asociados a este.`
    );
  };

  return { handleChangePage, groupList, meta, handleConfirmDeleteGroup };
};

export { useGroupsList };
