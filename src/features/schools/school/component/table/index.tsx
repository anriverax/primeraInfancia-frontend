import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderSchoolCell, schoolColumns } from "./columns";
import { ISchoolColumnKey, ISchoolTable, SchoolTableProps } from "../../schoolType";
import { tableClassNames } from "@/shared/constants";
import { confirmDelete } from "@/shared/utils/funtions";
import { useRouter } from "next/navigation";

const SchoolTable = ({ schoolsList, onDeleteSchool, onEditSchool }: SchoolTableProps): React.JSX.Element => {
  const router = useRouter();
  const handleConfirmDeleteSchool = async (schoolId: number): Promise<void> => {
    const confirmed = await confirmDelete({
      text: "¿Se encuentra seguro de quere eliminar el centro escolar?."
    });
    if (confirmed) {
      await onDeleteSchool(schoolId);
    }
  };

  const renderSchoolCell = useRenderSchoolCell(handleConfirmDeleteSchool, onEditSchool);

  return (
    <div className="space-y-4">
      <Table classNames={tableClassNames} aria-label="Tabla para mostrar los centros escolares registrados">
        <TableHeader columns={schoolColumns}>
          {(schoolCol) => <TableColumn key={schoolCol.key}>{schoolCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={schoolsList.length === 0} items={schoolsList}>
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
