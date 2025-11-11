import { useState } from "react";

import { useQueryRequest } from "@/shared/hooks/useApiQuery";
import { GroupListResult, IGroupTable } from "../groupType";
import { useDeleteRequest } from "@/shared/hooks/useDeleteRequest";

const useGroupsList = (): GroupListResult => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data: groupList, meta } = useQueryRequest<IGroupTable[]>(
    "groups-list",
    "/group",
    true,
    "grupos",
    page,
    limit
  );

  const { onConfirmDelete } = useDeleteRequest("groups-list", "/group", "grupo");

  const handleConfirmDeleteGroup = async (groupId: number, groupName: string): Promise<void> => {
    await onConfirmDelete(
      groupId,
      `Al eliminar el grupo: ${groupName}, también se eliminarán los usuarios asociados a este.`
    );
  };

  return { handleChangePage: setPage, groupList, meta, handleConfirmDeleteGroup };
};

export { useGroupsList };
