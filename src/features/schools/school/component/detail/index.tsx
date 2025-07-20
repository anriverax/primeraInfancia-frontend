import { tableClassNames } from "@/shared/constants";
import { confirmDelete } from "@/shared/utils/funtions";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { IPersonSchoolDetailTable, ISchoolDetailTable, ISchoolDetailColumnKey, SchoolPersonDetailTableProps, } from "../../schoolType";
import { schoolColumns, useRenderSchoolDetailCell } from "./columns";

const SchoolDetailTable = ({ schoolsDetailsList }: SchoolPersonDetailTableProps): React.JSX.Element => {

  const renderSchoolCell = useRenderSchoolDetailCell();

  return (
    <div className="space-y-4">
      <Table classNames={tableClassNames} aria-label="Tabla para mostrar los centros escolares registrados">
        <TableHeader columns={schoolColumns}>
          {(schoolCol) => <TableColumn key={schoolCol.key}>{schoolCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={!schoolsDetailsList} items={schoolsDetailsList}>
          {(schoolItem: ISchoolDetailTable) => (
            <TableRow
              key={schoolItem.id}
            >
              {(schoolKey) => (
                <TableCell>
                  {renderSchoolCell(schoolItem, schoolKey as ISchoolDetailColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SchoolDetailTable;
