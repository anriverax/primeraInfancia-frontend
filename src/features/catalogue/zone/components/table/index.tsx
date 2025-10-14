import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderZoneCell, zoneColumns } from "./columns";
import { IZoneColumnKey, IZoneTable } from "../../zoneType";
import { tableClassNames } from "@/shared/constants";
import { useZonesList } from "../../useZonesList";
import { TableLayout } from "@/shared/ui/custom/tableLayout";

const ZoneTable = (): React.JSX.Element => {
  const { zonesList } = useZonesList();
  const renderZoneCell = useRenderZoneCell();

  return (
    <TableLayout>
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
    </TableLayout>
  );
};

export default ZoneTable;
