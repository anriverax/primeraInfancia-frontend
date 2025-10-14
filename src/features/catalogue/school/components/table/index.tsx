import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderSchoolCell, headerColumns } from "./columns";
import { tableClassNames } from "@/shared/constants";
import { useSchoolList } from "../../hooks/useSchoolList";
import { ISchoolColumnKey, ISchoolTable } from "../../schoolType";
import { TableLayout } from "@/shared/ui/custom/tableLayout";
import CustomPagination from "@/shared/ui/custom/customPagination";

const SchoolTable = (): React.JSX.Element => {
  const { handleChangePage, schoolList, meta } = useSchoolList();
  const renderSchoolCell = useRenderSchoolCell();

  return (
    <>
      <TableLayout>
        <Table
          className="min-w-[max-content]"
          classNames={tableClassNames}
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

      {meta && schoolList.length > 0 && (
        <CustomPagination
          currentPage={meta.currentPage}
          lastPage={meta.lastPage}
          handleChangePage={handleChangePage}
        />
      )}
    </>
  );
};

export default SchoolTable;
