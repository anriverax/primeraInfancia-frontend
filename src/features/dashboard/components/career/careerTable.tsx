import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { careerColumns, useRenderCareerCell } from "./columns";
import { ICareerColumnKey, ICareerTable } from "../../dashboardType";
import CardLayoutDashboard from "../cardLayoutDashboard";

type CareerTableProps = {
  careerData: ICareerTable[];
};

const CareerTable = ({ careerData }: CareerTableProps): React.JSX.Element => {
  const renderCareerCell = useRenderCareerCell();

  return (
    <CardLayoutDashboard title="Nivel Académico - Docentes" clsCard="w-1/2">
      <Table
        shadow="none"
        classNames={{
          th: " text-bold text-sm text-black bg-white bg-gray-100",
          tr: "border border-gray-100",
          td: "border border-gray-100"
        }}
        aria-label="Tabla para mostrar las carreras registradas"
      >
        <TableHeader columns={careerColumns}>
          {(careerCol) => <TableColumn key={careerCol.key}>{careerCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={!careerData} items={careerData || []}>
          {(careerItem: ICareerTable) => (
            <TableRow key={careerItem.career}>
              {(careerKey) => (
                <TableCell>{renderCareerCell(careerItem, careerKey as ICareerColumnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </CardLayoutDashboard>
  );
};

export default CareerTable;
