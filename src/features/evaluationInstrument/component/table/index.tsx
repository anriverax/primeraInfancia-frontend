import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { BookCheck } from "lucide-react";
import { useRenderEvaluationInstrumentCell, evaluationInstrumentColumns } from "./columns";
import {
  IEvaluationInstrumentColumnKey,
  IEvaluationInstrumentTable,
  EvaluationInstrumentTableProps
} from "../../evaluationInstrumentType";
import { tableClassNames } from "@/shared/constants";
import { confirmDelete } from "@/shared/utils/funtions";

const EvaluationInstrumentTable = ({
  evaluationInstrumentsList
}: EvaluationInstrumentTableProps): React.JSX.Element => {
  const renderEvaluationInstrumentCell = useRenderEvaluationInstrumentCell();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BookCheck className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Listado</h2>
      </div>

      <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
        <TableHeader columns={evaluationInstrumentColumns}>
          {(evaluationInstrumentCol) => (
            <TableColumn key={evaluationInstrumentCol.key}>{evaluationInstrumentCol.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody isLoading={evaluationInstrumentsList.length === 0} items={evaluationInstrumentsList}>
          {(evaluationInstrumentItem: IEvaluationInstrumentTable) => (
            <TableRow key={evaluationInstrumentItem.id}>
              {(evaluationInstrumentKey) => (
                <TableCell>
                  {renderEvaluationInstrumentCell(
                    evaluationInstrumentItem,
                    evaluationInstrumentKey as IEvaluationInstrumentColumnKey
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

export default EvaluationInstrumentTable;
