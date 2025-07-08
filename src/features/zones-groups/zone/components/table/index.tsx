import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { MapPin } from "lucide-react";
import { useRenderZoneCell, zoneColumns } from "./columns";
import { IZoneColumnKey, IZoneTable, ZoneTableProps } from "../../zoneType";
import { tableClassNames } from "@/shared/constants";
import { confirmDelete } from "@/shared/utils/funtions";

const ZoneTable = ({ zonesList, onDeleteZone, onEditZone }: ZoneTableProps): React.JSX.Element => {
  const handleConfirmDeleteZone = async (zoneId: number): Promise<void> => {
    const confirmed = await confirmDelete({
      text: "Al eliminar la zona, también se eliminarán los grupos vinculados a ella."
    });
    if (confirmed) {
      await onDeleteZone(zoneId);
    }
  };

  const renderZoneCell = useRenderZoneCell(handleConfirmDeleteZone, onEditZone);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Zonas</h2>
      </div>

      <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
        <TableHeader columns={zoneColumns}>
          {(zoneCol) => <TableColumn key={zoneCol.key}>{zoneCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={zonesList.length === 0} items={zonesList}>
          {(zoneItem: IZoneTable) => (
            <TableRow key={zoneItem.id}>
              {(zoneKey) => <TableCell>{renderZoneCell(zoneItem, zoneKey as IZoneColumnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ZoneTable;
