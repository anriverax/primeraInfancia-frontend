import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderSchoolCell, schoolColumns } from "./columns";
import { ISchoolColumnKey, ISchoolTable, SchoolTableProps } from "../../schoolType";
import { tableClassNames } from "@/shared/constants";
import { confirmDelete } from "@/shared/utils/funtions";

const SchoolTable = ({ schoolsList, onDeleteSchool, onEditSchool }: SchoolTableProps): React.JSX.Element => {
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
      {/* <div className="flex items-center gap-2">
        <School className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">zonas</h2>
      </div> */}

      <Table classNames={tableClassNames} aria-label="Tabla para mostrar los centros escolares registrados">
        <TableHeader columns={ schoolColumns }>
          { (schoolCol) => <TableColumn key={ schoolCol.key }>{ schoolCol.label }</TableColumn> }
        </TableHeader>
        <TableBody isLoading={ schoolsList.length === 0} items={ schoolsList }>
          { (schoolItem: ISchoolTable) => (
            <TableRow key={ schoolItem.id }>
              { (schoolKey) => <TableCell>{ renderSchoolCell(schoolItem, schoolKey as ISchoolColumnKey) }</TableCell> }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SchoolTable;
