import { tableClassNames } from "@/shared/constants";
import { TableLayout } from "@/shared/ui/custom/tableLayout";
import { teacherColumns, useRenderTeacherCell } from "./renderTeacherColumns";
import { Table, TableBody, TableHeader, TableRow, TableCell, TableColumn } from "@heroui/react";
import { ITeacherColumnKey } from "../../../schoolType";

export type TeacherTableProps = {
  teacherData: { id: number; phoneNumber: string; fullName: string }[];
};

const TeacherTable = ({ teacherData }: TeacherTableProps): React.JSX.Element => {
  const renderTeacherCell = useRenderTeacherCell();

  return (
    <TableLayout>
      <Table
        removeWrapper
        className="min-w-[max-content]"
        classNames={tableClassNames}
        aria-label="Tabla para mostrar los docentes de cada centro educativo"
      >
        <TableHeader columns={teacherColumns}>
          {(teacherCol) => <TableColumn key={teacherCol.key}>{teacherCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={!teacherData} items={teacherData || []}>
          {(teacherBySchoolItem) => (
            <TableRow key={teacherBySchoolItem.id}>
              {(trainingModuleKey) => (
                <TableCell>
                  {renderTeacherCell(teacherBySchoolItem, trainingModuleKey as ITeacherColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableLayout>
  );
};

export default TeacherTable;
