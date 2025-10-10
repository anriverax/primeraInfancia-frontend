import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { tableClassNames } from "@/shared/constants";
import { useTrainingModuleList } from "../useTrainingModuleList";
import { ITrainingModuleColumnKey, ITrainingModuleTable } from "../trainingModuleType";
import { trainingModuleColumns, useRenderTrainingModuleCell } from "./columns";
import { ScrollShadow } from "@heroui/react";

const TrainingModuleTable = (): React.JSX.Element => {
  const { trainingModuleList } = useTrainingModuleList();
  const renderTrainingModuleCell = useRenderTrainingModuleCell();

  return (
    <ScrollShadow
      orientation="vertical"
      hideScrollBar={false}
      className="max-w-sm md:max-w-full p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto shadow-small rounded-large w-full mi"
    >
      <Table
        removeWrapper
        className="min-w-[max-content]"
        classNames={tableClassNames}
        aria-label="Tabla para mostrar las rutas de aprendizaje"
      >
        <TableHeader columns={trainingModuleColumns}>
          {(trainingModuleCol) => (
            <TableColumn key={trainingModuleCol.key}>{trainingModuleCol.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody isLoading={!trainingModuleList} items={trainingModuleList || []}>
          {(trainingModuleItem: ITrainingModuleTable) => (
            <TableRow key={trainingModuleItem.id}>
              {(trainingModuleKey) => (
                <TableCell>
                  {renderTrainingModuleCell(
                    trainingModuleItem,
                    trainingModuleKey as ITrainingModuleColumnKey
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollShadow>
  );
};

export default TrainingModuleTable;
