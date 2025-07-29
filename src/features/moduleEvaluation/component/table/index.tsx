import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Presentation } from "lucide-react";
import { useRenderModuleEvaluationCell, moduleEvaluationColumns } from "./columns";
import { IModuleEvaluationColumnKey, IModuleEvaluationTable, ModuleEvaluationTableProps } from "../../moduleEvaluationType";
import { tableClassNames } from "@/shared/constants";
import { confirmDelete } from "@/shared/utils/funtions";

const ModuleEvaluationTable = ({ moduleEvaluationsList}: ModuleEvaluationTableProps): React.JSX.Element => {
    const renderModuleEvaluationCell = useRenderModuleEvaluationCell();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Presentation className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Notas obtenidas</h2>
      </div>

      <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
        <TableHeader columns={ moduleEvaluationColumns }>
          { (moduleEvaluationCol) => <TableColumn key={ moduleEvaluationCol.key }>{ moduleEvaluationCol.label }</TableColumn> }
        </TableHeader>
        <TableBody isLoading={ moduleEvaluationsList.length === 0} items={ moduleEvaluationsList }>
          { (moduleEvaluationItem: IModuleEvaluationTable) => (
            <TableRow key={ moduleEvaluationItem.id }>
              { (moduleEvaluationKey) => <TableCell>{ renderModuleEvaluationCell(moduleEvaluationItem, moduleEvaluationKey as IModuleEvaluationColumnKey) }</TableCell> }
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ModuleEvaluationTable;
