import { teacherColumns, useRenderTeacherCell } from "./renderTeacherColumns";
import { ITeacherColumnKey } from "../../../schoolType";
import GenericTable from "@/components/ui/table/genericTable";

export type TeacherTableProps = {
  teacherData: { id: number; phoneNumber: string; fullName: string }[];
};

const TeacherTable = ({ teacherData }: TeacherTableProps): React.JSX.Element => {
  const renderTeacherCell = useRenderTeacherCell();

  return (
    <GenericTable
      items={teacherData}
      columns={teacherColumns}
      renderCell={(item, key) => renderTeacherCell(item, key as ITeacherColumnKey)}
      ariaLabel="Tabla para mostrar la agenda de calendarización de eventos"
    />
  );
};

export default TeacherTable;
