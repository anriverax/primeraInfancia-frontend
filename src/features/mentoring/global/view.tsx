import useGroupDFM from "@/features/group/hooks/useGroupDFM";
import { groupDetailByUserColumns, useRenderGroupCell } from "./column";
import { IGroupByUserColumnKey } from "@/features/group/groupType";
import GenericTable from "@/components/ui/table/genericTable";

const ViewAnswerAppendix = (): React.JSX.Element => {
  const { groupDetailList } = useGroupDFM();
  const renderGroup = useRenderGroupCell();

  groupDetailList?.sort((a, b) => (a.Person?.fullName ?? "").localeCompare(b.Person?.fullName ?? ""));

  return (
    <GenericTable
      items={groupDetailList}
      columns={groupDetailByUserColumns}
      renderCell={(item, key) => renderGroup(item, key as IGroupByUserColumnKey)}
      ariaLabel="Tabla para mostrar la agenda de calendarización de eventos"
    />
  );
};

export default ViewAnswerAppendix;
