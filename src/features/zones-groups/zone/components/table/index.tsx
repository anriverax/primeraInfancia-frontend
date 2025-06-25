"use client";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { MapPin } from "lucide-react";
import { useRenderZoneCell, zoneColumns } from "./columns";
import { IZone, IZoneColumnKey, ZoneTableProps } from "../../zoneType";

const ZoneTable = ({ zonesList, deleteZone }: ZoneTableProps): React.JSX.Element => {
  const renderZoneCell = useRenderZoneCell(deleteZone);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Zonas</h2>
      </div>

      <Table aria-label="Tabla para mostrar las zonas registradas">
        <TableHeader columns={zoneColumns}>
          {(zoneCol) => <TableColumn key={zoneCol.key}>{zoneCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={zonesList.length === 0} items={zonesList}>
          {(zoneItem: IZone) => (
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
