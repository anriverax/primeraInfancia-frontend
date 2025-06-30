import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Users } from "lucide-react";
import { groupColumns, useRenderGroupCell } from "./columns";
import { GroupTableProps, IGroupColumnKey, IGroupTable } from "../../groupType";

const GroupTable = ({ groupList, deleteGroup }: GroupTableProps): React.JSX.Element => {
  const renderGroupCell = useRenderGroupCell(deleteGroup);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Grupos</h2>
      </div>

      <Table aria-label="Tabla para mostrar los grupos registradas">
        <TableHeader columns={groupColumns}>
          {(groupCol) => <TableColumn key={groupCol.key}>{groupCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={groupList.length === 0} items={groupList}>
          {(groupItem: IGroupTable) => (
            <TableRow key={groupItem.id}>
              {(groupKey) => (
                <TableCell>{renderGroupCell(groupItem, groupKey as IGroupColumnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GroupTable;
