import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderGroupCell } from "./columns";
import { IGroupColumnKey, IGroupTable } from "../../groupType";
import { tableClassNames } from "@/shared/constants";
import { Spinner } from "@heroui/react";
import { useGroupsList } from "../../hooks/useGroupsList";
import { useGroupTable } from "../../hooks/useGroupTable";

const GroupTable = (): React.JSX.Element => {
  const { handleChangePage, groupList, meta, handleConfirmDeleteGroup } = useGroupsList();
  const { bottomContent, headerColumns } = useGroupTable(meta, handleChangePage);
  const renderGroupCell = useRenderGroupCell(handleConfirmDeleteGroup);

  const loadingState = !groupList || groupList.length === 0 ? "loading" : "idle";

  return (
    <Table
      classNames={tableClassNames}
      aria-label="Tabla para mostrar los grupos registradas"
      bottomContent={bottomContent}
    >
      <TableHeader columns={headerColumns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        loadingState={loadingState}
        items={groupList ?? []}
        loadingContent={<Spinner />}
        emptyContent={"No users found"}
      >
        {(groupItem: IGroupTable) => (
          <TableRow key={groupItem.id}>
            {(groupKey) => (
              <TableCell>{renderGroupCell(groupItem, groupKey as IGroupColumnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default GroupTable;
