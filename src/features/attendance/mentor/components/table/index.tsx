import { tableClassNames } from "@/shared/constants";
import { Table } from "@heroui/react";
// bottomContent={bottomContent}
const AttendanceTable = (): React.JSX.Element => {
  return (
    <Table classNames={tableClassNames} aria-label="Tabla para mostrar los grupos registradas"></Table>
  );
};

export default AttendanceTable;
