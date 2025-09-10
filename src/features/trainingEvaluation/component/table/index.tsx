import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { LaptopMinimalCheck } from "lucide-react";
import { useRenderTrainingEvaluationCell, trainingEvaluationColumns } from "./columns";
import {
  ITrainingEvaluationColumnKey,
  ITrainingEvaluationTable,
  TrainingEvaluationTableProps
} from "../../trainingEvaluationType";
import { tableClassNames } from "@/shared/constants";

const TrainingEvaluationTable = ({
  trainingEvaluationsList
}: TrainingEvaluationTableProps): React.JSX.Element => {
  const renderTrainingEvaluationCell = useRenderTrainingEvaluationCell();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LaptopMinimalCheck className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Listado</h2>
      </div>

      <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
        <TableHeader columns={trainingEvaluationColumns}>
          {(trainingEvaluationCol) => (
            <TableColumn key={trainingEvaluationCol.key}>{trainingEvaluationCol.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody isLoading={trainingEvaluationsList.length === 0} items={trainingEvaluationsList}>
          {(trainingEvaluationItem: ITrainingEvaluationTable) => (
            <TableRow key={trainingEvaluationItem.id}>
              {(trainingEvaluationKey) => (
                <TableCell>
                  {renderTrainingEvaluationCell(
                    trainingEvaluationItem,
                    trainingEvaluationKey as ITrainingEvaluationColumnKey
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrainingEvaluationTable;
