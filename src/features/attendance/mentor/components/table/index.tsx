import { tableClassNames } from "@/shared/constants";
import { Table } from "@heroui/react";

const AttendanceTable = (): React.JSX.Element => {
  return (
    <Table
      classNames={tableClassNames}
      aria-label="Tabla para mostrar los grupos registradas"
      bottomContent={bottomContent}
    ></Table>
  );
};

export default AttendanceTable;
