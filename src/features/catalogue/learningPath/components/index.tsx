import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { tableClassNames } from "@/shared/constants";
import { evaluationInstrumentColumns, useRenderEvaluationInstrumentCell } from "./columns";
import { useLearningPathList } from "../useLearningPathList";
import { ILearningPathColumnKey, ILearningPathTable } from "../learningPathType";

const LearningPathTable = (): React.JSX.Element => {
  const { learningPathList } = useLearningPathList();
  const renderEvaluationInstrumentCell = useRenderEvaluationInstrumentCell();

  return (
    <Table
      classNames={tableClassNames}
      aria-label="Tabla para mostrar las rutas de aprendizaje registradas"
    >
      <TableHeader columns={evaluationInstrumentColumns}>
        {(trainingModuleCol) => (
          <TableColumn key={trainingModuleCol.key}>{trainingModuleCol.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody isLoading={!learningPathList} items={learningPathList || []}>
        {(evaluationInstrumentItem: ILearningPathTable) => (
          <TableRow key={evaluationInstrumentItem.id}>
            {(evaluationInstrumentKey) => (
              <TableCell>
                {renderEvaluationInstrumentCell(
                  evaluationInstrumentItem,
                  evaluationInstrumentKey as ILearningPathColumnKey
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LearningPathTable;
