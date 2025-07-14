import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { groupColumns, useRenderGroupCell } from "./columns";
import { GroupTableProps, IGroupColumnKey, IGroupTable } from "../../groupType";
import { tableClassNames } from "@/shared/constants";
import { useGroupsList } from "@/features/zones-groups/hooks/group/useGroupsList";
import { Pagination } from "@heroui/react";

const GroupTable = ({ onEditGroup }: GroupTableProps): React.JSX.Element => {
  const { handleChangePage, groupList, meta, handleConfirmDeleteGroup } = useGroupsList();

  const renderGroupCell = useRenderGroupCell(handleConfirmDeleteGroup, onEditGroup);

  return (
    <>
      <Table classNames={tableClassNames} aria-label="Tabla para mostrar los grupos registradas">
        <TableHeader columns={groupColumns}>
          {(groupCol) => <TableColumn key={groupCol.key}>{groupCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={!groupList} items={groupList || []}>
          {(groupItem: IGroupTable) => (
            <TableRow key={groupItem.id}>
              {(groupKey) => (
                <TableCell>{renderGroupCell(groupItem, groupKey as IGroupColumnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {meta && (
        <Pagination
          isCompact
          showControls
          initialPage={meta.currentPage}
          variant="light"
          total={meta.lastPage}
          onChange={(e) => handleChangePage(e)}
        />
      )}
    </>
  );
};

export default GroupTable;
