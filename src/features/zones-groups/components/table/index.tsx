"use client";

import { useRenderZoneCell, zoneColumns } from "@/features/zones-groups/components/table/columns";

import { IZoneColumnKey, IZoneList } from "@/features/zones-groups/zoneType";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { MapPin } from "lucide-react";

type ZoneTableProps = {
  zonesList: IZoneList[];
  toggleVisibility: (_form: "Z" | "G", _data?: IZoneList | null) => void;
  deleteZone: (_zoneId: number) => Promise<void>;
};

const ZoneTable = ({ zonesList, toggleVisibility, deleteZone }: ZoneTableProps): React.JSX.Element => {
  const renderZoneCell = useRenderZoneCell(deleteZone, toggleVisibility);

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
          {(zoneItem: IZoneList) => (
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
