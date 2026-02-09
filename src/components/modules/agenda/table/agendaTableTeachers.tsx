import GenericTable from "@/components/ui/table/genericTable";
import { AgendaTeacherHeaderColumnsKey, ITeacherListWithSchoolV2 } from "../agenda.type";
import { usePaginationCustom } from "@/shared/hooks/data/usePaginationCustom";
import { agendaTeacherHeaderColumns, useRenderAgendaTeacherCell } from "./agendaTeacherColumns";

type AgendaTableTeachersProps = {
  teachers: ITeacherListWithSchoolV2[];
};

const AgendaTableTeachers = ({ teachers }: AgendaTableTeachersProps): React.JSX.Element => {
  const meta = usePaginationCustom<ITeacherListWithSchoolV2>(teachers);
  const renderAgendaTeacherCell = useRenderAgendaTeacherCell();

  return (
    <GenericTable<ITeacherListWithSchoolV2>
      items={meta.paginatedData}
      columns={agendaTeacherHeaderColumns}
      renderCell={(item, key) => renderAgendaTeacherCell(item, key as AgendaTeacherHeaderColumnsKey)}
      ariaLabel="Tabla para mostrar la agenda de calendarización de eventos"
      pagination={
        teachers.length > 5
          ? {
              currentPage: meta.currentPage,
              lastPage: meta.lastPage,
              onPageChange: meta.setPage
            }
          : undefined
      }
    />
  );
};

export default AgendaTableTeachers;
