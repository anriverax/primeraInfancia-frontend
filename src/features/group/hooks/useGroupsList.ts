import { useState } from "react";

import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { GroupListResult, IGroupTable } from '../groupType';

const useGroupsList = (): GroupListResult => {
  const [page, setPage] = useState<number>(1);
  const limit = 5;

  const {
    data: groupList,
    meta,
    onConfirmDelete
  } = useQueryRequest<IGroupTable[]>("groups-list", "/group", true, "grupos", page, limit);

  const handleConfirmDeleteGroup = async (groupId: number, groupName: string): Promise<void> => {
    await onConfirmDelete(
      groupId,
      `Al eliminar el grupo: ${groupName}, también se eliminarán los usuarios asociados a este.`
    );
  };

  return { handleChangePage: setPage, groupList, meta, handleConfirmDeleteGroup };
};

export { useGroupsList };
