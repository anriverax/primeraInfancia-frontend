import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { careerColumns, useRenderCareerCell } from "./columns";
import { ICareerColumnKey, IGroupCount } from "@/features/dashboard/dashboardType";
import CardLayoutDashboard from "../../cardLayoutDashboard";

type CareerTableProps = {
  title: string;
  careerData: IGroupCount[];
};

const CareerTable = ({ title, careerData }: CareerTableProps): React.JSX.Element => {
  const renderCareerCell = useRenderCareerCell();

  return (
    <CardLayoutDashboard title={title} clsCard="w-1/2">
      <Table
        shadow="none"
        classNames={{
          th: " text-bold text-sm text-black bg-white bg-gray-100",
          tr: "border border-gray-100",
          td: "border border-gray-100"
        }}
        aria-label="Tabla para mostrar las estadisticas"
      >
        <TableHeader columns={careerColumns}>
          {(careerCol) => <TableColumn key={careerCol.key}>{careerCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={!careerData} items={careerData || []}>
          {(careerItem: IGroupCount) => (
            <TableRow key={careerItem.label}>
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
