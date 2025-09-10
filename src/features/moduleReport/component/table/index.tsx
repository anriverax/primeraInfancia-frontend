import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { LaptopMinimalCheck } from "lucide-react";
import { useRenderModuleReportCell, moduleReportColumns } from "./columns";
import {
  IModuleReportColumnKey,
  IModuleReportTable,
  ModuleReportTableProps
} from "../../moduleReportType";
import { tableClassNames } from "@/shared/constants";

const ModuleReportTable = ({ moduleReportsList }: ModuleReportTableProps): React.JSX.Element => {
  const renderModuleReportCell = useRenderModuleReportCell();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LaptopMinimalCheck className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Listado</h2>
      </div>

      <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
        <TableHeader columns={moduleReportColumns}>
          {(moduleReportCol) => (
            <TableColumn key={moduleReportCol.key}>{moduleReportCol.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody isLoading={moduleReportsList.length === 0} items={moduleReportsList}>
          {(moduleReportItem: IModuleReportTable) => (
            <TableRow key={moduleReportItem.id}>
              {(moduleReportKey) => (
                <TableCell>
                  {renderModuleReportCell(moduleReportItem, moduleReportKey as IModuleReportColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ModuleReportTable;
