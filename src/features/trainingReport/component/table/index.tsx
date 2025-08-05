import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { MapPin } from "lucide-react";
import { useRenderTrainingReportCell, trainingReportColumns } from "./columns";
import { ITrainingReportColumnKey, ITrainingReportTable, TrainingReportTableProps } from "../../trainingReportType";
import { tableClassNames } from "@/shared/constants";
import { confirmDelete } from "@/shared/utils/funtions";

const TrainingReportTable = ({ trainingReportsList }: TrainingReportTableProps): React.JSX.Element => {
   const renderTrainingReportCell = useRenderTrainingReportCell();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">zonas</h2>
      </div>

      <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
        <TableHeader columns={ trainingReportColumns }>
          { (trainingReportCol) => <TableColumn key={ trainingReportCol.key }>{ trainingReportCol.label }</TableColumn> }
        </TableHeader>
        <TableBody isLoading={ trainingReportsList.length === 0} items={ trainingReportsList }>
          { (trainingReportItem: ITrainingReportTable) => (
            <TableRow key={ trainingReportItem.id }>
              { (trainingReportKey) => <TableCell>{ renderTrainingReportCell(trainingReportItem, trainingReportKey as ITrainingReportColumnKey) }</TableCell> }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrainingReportTable;
