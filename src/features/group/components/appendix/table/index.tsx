import { useRenderDetailAppendixCell, detailAppendixColumns } from "./columns";
import { IDetailAppendixColumnKey } from "@/features/group/groupType";
import { useAppendixInscriptionList } from "@/features/mentoring/hooks/useAppendixInscription";
import GenericTable from "@/components/ui/table/genericTable";

type DetailAppendixTableProps = {
  id: number;
};

const DetailAppendixTable = ({ id }: DetailAppendixTableProps): React.JSX.Element => {
  const { teacherAppendixsList } = useAppendixInscriptionList(id);
  const renderDetailAppendixCell = useRenderDetailAppendixCell();

  return (
    <GenericTable
      items={teacherAppendixsList}
      columns={detailAppendixColumns}
      renderCell={(item, key) => renderDetailAppendixCell(item, key as IDetailAppendixColumnKey)}
      ariaLabel="Tabla para mostrar la agenda de calendarización de eventos"
    />
  );
};

export default DetailAppendixTable;
