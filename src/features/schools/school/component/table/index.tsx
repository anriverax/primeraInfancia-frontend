import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderSchoolCell, schoolColumns } from "./columns";
import { ISchoolColumnKey, ISchoolTable, SchoolTableProps } from "../../schoolType";
import { tableClassNames } from "@/shared/constants";
import { useRouter } from "next/navigation";

const SchoolTable = ({ schoolsList }: SchoolTableProps): React.JSX.Element => {
  const router = useRouter();

  const renderSchoolCell = useRenderSchoolCell();

  return (
    <div className="space-y-4">
      <Table classNames={tableClassNames} aria-label="Tabla para mostrar los centros escolares registrados">
        <TableHeader columns={schoolColumns}>
          {(schoolCol) => <TableColumn key={schoolCol.key}>{schoolCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={!schoolsList} items={schoolsList}>
          {(schoolItem: ISchoolTable) => (
            <TableRow key={schoolItem.id}    onClick={() => router.push(`centros-escolares/${schoolItem.id}`)}
              style={{ cursor: "pointer" }}>
              {(schoolKey) => <TableCell>{renderSchoolCell(schoolItem, schoolKey as ISchoolColumnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SchoolTable;
