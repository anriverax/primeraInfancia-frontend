import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { MapPin } from "lucide-react";
import { useRenderEnrollmentCell, enrollmentColumns } from "./columns";
import { IEnrollmentColumnKey, IEnrollmentTable, EnrollmentTableProps } from "../../enrollmentType";
import { tableClassNames } from "@/shared/constants";
import { confirmDelete } from "@/shared/utils/funtions";

const EnrollmentTable = ({ enrollmentsList  }: EnrollmentTableProps): React.JSX.Element => {
   const renderEnrollmentCell = useRenderEnrollmentCell();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Listado</h2>
      </div>

      <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
        <TableHeader columns={ enrollmentColumns }>
          { (enrollmentCol) => <TableColumn key={ enrollmentCol.key }>{ enrollmentCol.label }</TableColumn> }
        </TableHeader>
        <TableBody isLoading={ enrollmentsList.length === 0} items={ enrollmentsList }>
          { (enrollmentItem: IEnrollmentTable) => (
            <TableRow key={ enrollmentItem.id }>
              { (enrollmentKey) => <TableCell>{ renderEnrollmentCell(enrollmentItem, enrollmentKey as IEnrollmentColumnKey) }</TableCell> }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EnrollmentTable;
