import { useTrainingModuleList } from "../useTrainingModuleList";
import { ITrainingModuleColumnKey } from "../trainingModuleType";
import { trainingModuleColumns, useRenderTrainingModuleCell } from "./columns";
import GenericTable from "@/components/ui/table/genericTable";

const TrainingModuleTable = (): React.JSX.Element => {
  const { trainingModuleList } = useTrainingModuleList();
  const renderTrainingModuleCell = useRenderTrainingModuleCell();

  return (
    <GenericTable
      items={trainingModuleList}
      columns={trainingModuleColumns}
      renderCell={(item, key) => renderTrainingModuleCell(item, key as ITrainingModuleColumnKey)}
      ariaLabel="Tabla para mostrar los modulos de formación registrados"
    />
  );
};

export default TrainingModuleTable;
