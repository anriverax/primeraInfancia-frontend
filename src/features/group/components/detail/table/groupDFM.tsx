import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import useGroupDFM from "../../../hooks/useGroupDFM";
import { groupDetailByUserColumns, useRenderGroupDFMCell } from "./groupColumns";
import { tableClassNames } from "@/shared/constants";
import { IGroupByUser, IGroupByUserColumnKey } from "@/features/group/groupType";

const GroupDFM = (): React.JSX.Element => {
  const { groupDetailList } = useGroupDFM();
  const renderGroupDFM = useRenderGroupDFMCell();

  groupDetailList?.sort((a, b) =>
    (a.Person?.fullName ?? "").localeCompare(b.Person?.fullName ?? "")
  );

  return (
    <div className="p-4 z-0 overflow-x-auto shadow-small rounded-large w-full">
      <div className="max-w-sm md:max-w-full">
        <Table
          removeWrapper
          className="min-w-[max-content]"
          classNames={tableClassNames}
          aria-label="Tabla para mostrar las rutas de aprendizaje registradas"
        >
          <TableHeader columns={groupDetailByUserColumns}>
            {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
          </TableHeader>
          <TableBody isLoading={!groupDetailList} items={groupDetailList || []}>
            {(groupDetailByUserItem: IGroupByUser) => (
              <TableRow key={groupDetailByUserItem.id}>
                {(groupDetailByUserKey) => (
                  <TableCell>
                    {renderGroupDFM(
                      groupDetailByUserItem,
                      groupDetailByUserKey as IGroupByUserColumnKey
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GroupDFM;
