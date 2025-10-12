import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderSchoolCell } from "./columns";
import { tableClassNames } from "@/shared/constants";
import { useSchoolList } from "../../hooks/useSchoolList";
import { useSchoolTable } from "../../hooks/useSchoolTable";
import { ISchoolColumnKey, ISchoolTable } from "../../schoolType";
import { TableLayout } from "@/shared/ui/custom/tableLayout";

const SchoolTable = (): React.JSX.Element => {
  const { handleChangePage, schoolList, meta } = useSchoolList();
  const { bottomContent, headerColumns } = useSchoolTable(meta, schoolList, handleChangePage);

  const renderSchoolCell = useRenderSchoolCell();

  return (
    <TableLayout>
      <Table
        removeWrapper
        className="min-w-[max-content]"
        classNames={tableClassNames}
        bottomContent={bottomContent}
        aria-label="Tabla para mostrar los Centros escolares registrados"
      >
        <TableHeader columns={headerColumns}>
          {(schoolCol) => <TableColumn key={schoolCol.key}>{schoolCol.label}</TableColumn>}
        </TableHeader>
        <TableBody items={schoolList ?? []}>
          {(schoolItem: ISchoolTable) => (
            <TableRow key={schoolItem.id}>
              {(schoolKey) => (
                <TableCell>{renderSchoolCell(schoolItem, schoolKey as ISchoolColumnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableLayout>
  );
};

export default SchoolTable;
