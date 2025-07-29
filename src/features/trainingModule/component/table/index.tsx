import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { BookOpenCheck } from "lucide-react";
import { useRenderTrainingModuleCell, trainingModuleColumns } from "./columns";
import { ITrainingModuleColumnKey, ITrainingModuleTable, TrainingModuleTableProps } from "../../trainingModuleType";
import { tableClassNames } from "@/shared/constants";
import { confirmDelete } from "@/shared/utils/funtions";

const TrainingModuleTable = ({ trainingModulesList }: TrainingModuleTableProps): React.JSX.Element => {


  const renderTrainingModuleCell = useRenderTrainingModuleCell();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BookOpenCheck className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Listado</h2>
      </div>

      <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
        <TableHeader columns={ trainingModuleColumns }>
          { (trainingModuleCol) => <TableColumn key={ trainingModuleCol.key }>{ trainingModuleCol.label }</TableColumn> }
        </TableHeader>
        <TableBody isLoading={ trainingModulesList.length === 0} items={ trainingModulesList }>
          { (trainingModuleItem: ITrainingModuleTable) => (
            <TableRow key={ trainingModuleItem.id }>
              { (trainingModuleKey) => <TableCell>{ renderTrainingModuleCell(trainingModuleItem, trainingModuleKey as ITrainingModuleColumnKey) }</TableCell> }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrainingModuleTable;
