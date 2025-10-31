import { tableClassNames } from "@/shared/constants";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { teacherShiftheaderColumns, useTeacherShiftCell } from "./teacherShiftColumns";
import { ITeacherShiftColumnKey, TeacherShift } from "../../appendix2Type";

type TeacherShiftTableProps = {
  items: TeacherShift[];
  onDelete: (id: number) => void;
};

const TeacherShiftTable = ({ items, onDelete }: TeacherShiftTableProps) => {
  const renderCell = useTeacherShiftCell(onDelete);

  return (
    <Table
      classNames={tableClassNames}
      className="w-full"
      aria-label="Tabla para mostrar los registrs de datos personales"
    >
      <TableHeader columns={teacherShiftheaderColumns}>
        {(col) => <TableColumn key={col.key}>{col.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items ?? []}>
        {(item: TeacherShift) => (
          <TableRow key={item.id}>
            {(key) => <TableCell>{renderCell(item, key as ITeacherShiftColumnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TeacherShiftTable;
