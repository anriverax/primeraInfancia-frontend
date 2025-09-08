import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderZoneCell, zoneColumns } from "./columns";
import { IZoneColumnKey, IZoneTable } from "../../zoneType";
import { tableClassNames } from "@/shared/constants";
import { useZonesList } from "@/features/zone/useZonesList";

const ZoneTable = (): React.JSX.Element => {
  const { zonesList } = useZonesList();
  const renderZoneCell = useRenderZoneCell();

  return (
    <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
      <TableHeader columns={zoneColumns}>
        {(zoneCol) => <TableColumn key={zoneCol.key}>{zoneCol.label}</TableColumn>}
      </TableHeader>
      <TableBody items={zonesList || []}>
        {zonesList === undefined ? (
          // Mientras no hay datos
          <TableRow>
            <TableCell colSpan={zoneColumns.length}>
              <div className="py-6 text-center text-gray-500">Cargando zonas...</div>
            </TableCell>
          </TableRow>
        ) : (
          // Cuando ya tienes datos
          (zoneItem: IZoneTable) => (
            <TableRow key={zoneItem.id}>
              {(zoneKey) => <TableCell>{renderZoneCell(zoneItem, zoneKey as IZoneColumnKey)}</TableCell>}
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default ZoneTable;
