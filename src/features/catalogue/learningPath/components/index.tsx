import { evaluationInstrumentColumns, useRenderEvaluationInstrumentCell } from "./columns";
import { useLearningPathList } from "../useLearningPathList";
import { ILearningPathColumnKey } from "../learningPathType";
import GenericTable from "@/components/ui/table/genericTable";

const LearningPathTable = (): React.JSX.Element => {
  const { learningPathList } = useLearningPathList();
  const renderEvaluationInstrumentCell = useRenderEvaluationInstrumentCell();

  return (
    <GenericTable
      items={learningPathList}
      columns={evaluationInstrumentColumns}
      renderCell={(item, key) => renderEvaluationInstrumentCell(item, key as ILearningPathColumnKey)}
      ariaLabel="Tabla para mostrar la agenda de calendarización de eventos"
    />
  );
};

export default LearningPathTable;
