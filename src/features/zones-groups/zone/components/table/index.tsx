import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderZoneCell, zoneColumns } from "./columns";
import { IZoneColumnKey, IZoneTable, ZoneTableProps } from "../../zoneType";
import { tableClassNames } from "@/shared/constants";
import { useZonesList } from "@/features/zones-groups/hooks/useZonesList";

const ZoneTable = ({ onEditZone }: ZoneTableProps): React.JSX.Element => {
  const { zonesList, handleConfirmDeleteZone } = useZonesList();
  const renderZoneCell = useRenderZoneCell(handleConfirmDeleteZone, onEditZone);

  return (
    <Table classNames={tableClassNames} aria-label="Tabla para mostrar las zonas registradas">
      <TableHeader columns={zoneColumns}>
        {(zoneCol) => <TableColumn key={zoneCol.key}>{zoneCol.label}</TableColumn>}
      </TableHeader>
      <TableBody isLoading={!zonesList} items={zonesList || []}>
        {(zoneItem: IZoneTable) => (
          <TableRow key={zoneItem.id}>
            {(zoneKey) => <TableCell>{renderZoneCell(zoneItem, zoneKey as IZoneColumnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ZoneTable;
