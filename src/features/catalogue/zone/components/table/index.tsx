import { useRenderZoneCell, zoneColumns } from "./columns";
import { IZoneColumnKey, IZoneTable } from "../../zoneType";
import GenericTable from "@/components/ui/table/genericTable";
import { useApiQuery } from "@/shared/hooks/http/useApiQuery";

const ZoneTable = (): React.JSX.Element => {
  const { data: zonesList } = useApiQuery<IZoneTable[]>({
    key: "zones-list",
    endpoint: "/catalogue/zone",
    enabled: true,
    description: "zonas"
  });

  const renderZoneCell = useRenderZoneCell();

  return (
    <GenericTable
      items={zonesList}
      columns={zoneColumns}
      renderCell={(item, key) => renderZoneCell(item, key as IZoneColumnKey)}
      ariaLabel="Tabla para mostrar las zonas registradas"
    />
  );
};

export default ZoneTable;
