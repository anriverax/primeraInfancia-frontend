import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { tableClassNames } from "@/shared/constants";
import { evaluationInstrumentColumns, useRenderEvaluationInstrumentCell } from "./columns";
import { useEvaluationInstrumentList } from "../useEvaluationInstrumentList";
import { IEvaluationInstrumentColumnKey, IEvaluationInstrumentTable } from "../evaluationInstrumentType";

const EvaluationInstrumentTable = (): React.JSX.Element => {
  const { evaluationInstrumentList } = useEvaluationInstrumentList();
  const renderEvaluationInstrumentCell = useRenderEvaluationInstrumentCell();

  return (
    <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
      <TableHeader columns={evaluationInstrumentColumns}>
        {(trainingModuleCol) => (
          <TableColumn key={trainingModuleCol.key}>{trainingModuleCol.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody isLoading={!evaluationInstrumentList} items={evaluationInstrumentList || []}>
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
  );
};

export default EvaluationInstrumentTable;
