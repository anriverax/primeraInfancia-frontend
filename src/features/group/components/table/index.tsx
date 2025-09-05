import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  SortDescriptor
} from "@heroui/table";
import { useRenderGroupCell } from "./columns";
import { IGroupColumnKey, IGroupTable } from "../../groupType";
import { tableClassNames } from "@/shared/constants";
import { useGroupsList } from "../../hooks/useGroupsList";
import { useGroupTable } from "../../hooks/useGroupTable";
import { useMemo, useState } from "react";

const GroupTable = (): React.JSX.Element => {
  const { handleChangePage, groupList, meta, handleConfirmDeleteGroup } = useGroupsList();
  const { bottomContent, headerColumns } = useGroupTable(meta, groupList, handleChangePage);
  const renderGroupCell = useRenderGroupCell(handleConfirmDeleteGroup);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "departments",
    direction: "ascending"
  });

  const sortedItems = useMemo(() => {
    if (!groupList || groupList.length === 0) return groupList;

    return groupList.sort((a: IGroupTable, b: IGroupTable) => {
      const first = a[sortDescriptor.column as keyof IGroupTable] as number;
      const second = b[sortDescriptor.column as keyof IGroupTable] as number;

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, groupList]);

  return (
    <Table
      classNames={tableClassNames}
      aria-label="Tabla para mostrar los grupos registradas"
      bottomContent={bottomContent}
      sortDescriptor={sortDescriptor}
      onSortChange={(descriptor: SortDescriptor) => setSortDescriptor(descriptor)}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={column.sortable}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={sortedItems ?? []} emptyContent="No hay registros que mostrar.">
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
