import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import useGroupDFM from "../../../hooks/useGroupDFM";
import { groupDetailByUserColumns, useRenderGroupDFMCell } from "./groupColumns";
import { tableClassNames } from "@/shared/constants";
import { IGroupByUser, IGroupByUserColumnKey } from "@/features/group/groupType";

const GroupDFM = (): React.JSX.Element => {
  const { groupDetailList } = useGroupDFM();
  const { renderCell: renderGroupDFM } = useRenderGroupDFMCell();

  const groupList = groupDetailList ?? [];
  groupList?.sort((a, b) => (a.Person?.fullName ?? "").localeCompare(b.Person?.fullName ?? ""));

  return (
    <>
      <Table
        classNames={tableClassNames}
        className="max-w-sm pr-2 md:max-w-full md:pr-0"
        aria-label="Tabla para mostrar los docentes de cada mentor"
      >
        <TableHeader columns={groupDetailByUserColumns}>
          {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={!groupList} items={groupList || []}>
          {(groupDetailByUserItem: IGroupByUser) => (
            <TableRow key={groupDetailByUserItem.id}>
              {(groupDetailByUserKey) => (
                <TableCell>
                  {renderGroupDFM(groupDetailByUserItem, groupDetailByUserKey as IGroupByUserColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default GroupDFM;
