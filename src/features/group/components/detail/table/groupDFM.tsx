import useGroupDFM from "../../../hooks/useGroupDFM";
import { groupDetailByUserColumns, useRenderGroupDFMCell } from "./groupColumns";
import { IGroupByUserColumnKey } from "@/features/group/groupType";
import GenericTable from "@/components/ui/table/genericTable";

const GroupDFM = (): React.JSX.Element => {
  const { groupDetailList } = useGroupDFM();
  const { renderCell: renderGroupDFM } = useRenderGroupDFMCell();

  const groupList = groupDetailList ?? [];
  groupList?.sort((a, b) => (a.Person?.fullName ?? "").localeCompare(b.Person?.fullName ?? ""));

  return (
    <GenericTable
      items={groupList}
      columns={groupDetailByUserColumns}
      renderCell={(item, key) => renderGroupDFM(item, key as IGroupByUserColumnKey)}
      ariaLabel="Tabla para mostrar la agenda de calendarización de eventos"
    />
  );
};

export default GroupDFM;
