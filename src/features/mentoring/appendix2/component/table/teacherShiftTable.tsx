import { teacherShiftheaderColumns, useTeacherShiftCell } from "./teacherShiftColumns";
import { ITeacherShiftColumnKey, TeacherShift } from "../../appendix2Type";
import GenericTable from "@/components/ui/table/genericTable";

type TeacherShiftTableProps = {
  items: TeacherShift[];
  onDelete: (id: number) => void;
};

const TeacherShiftTable = ({ items, onDelete }: TeacherShiftTableProps): React.JSX.Element => {
  const renderCell = useTeacherShiftCell(onDelete);

  return (
    <GenericTable
      items={items}
      columns={teacherShiftheaderColumns}
      renderCell={(item, key) => renderCell(item, key as ITeacherShiftColumnKey)}
      ariaLabel="Tabla para mostrar la agenda de calendarización de eventos"
    />
  );
};

export default TeacherShiftTable;
