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
    <div className="overflow-x-auto max-w-full">
      <ScrollShadow orientation="horizontal" hideScrollBar={false} className="w-full overflow-x-auto">
        <div className="max-w-sm lg:max-w-full">
          <Table
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
        </div>
      </ScrollShadow>
    </div>
  );
};

export default TrainingModuleTable;
