import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { useRenderDetailAppendixCell, detailAppendixColumns } from "./columns";
import { IDetailAppendixColumnKey, IDetailAppendixTable } from "@/features/group/groupType";
import { tableClassNames } from "@/shared/constants";
import { useAppendixInscriptionList } from "@/features/mentoring/hooks/useAppendixInscription";
import { TableLayout } from "@/shared/ui/custom/table/tableLayout";

type DetailAppendixTableProps = {
  id: number;
};

const DetailAppendixTable = ({ id }: DetailAppendixTableProps): React.JSX.Element => {
  const { teacherAppendixsList } = useAppendixInscriptionList(id);
  const renderDetailAppendixCell = useRenderDetailAppendixCell();

  return (
    <TableLayout>
      <Table classNames={tableClassNames} aria-label="Tabla para mostrar los detalles del anexo">
        <TableHeader columns={detailAppendixColumns}>
          {(daCol) => <TableColumn key={daCol.key}>{daCol.label}</TableColumn>}
        </TableHeader>
        <TableBody isLoading={!teacherAppendixsList} items={teacherAppendixsList || []}>
          {(appendixDetailItem: IDetailAppendixTable) => (
            <TableRow key={appendixDetailItem.title}>
              {(dakey) => (
                <TableCell>
                  {renderDetailAppendixCell(appendixDetailItem, dakey as IDetailAppendixColumnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableLayout>
  );
};

export default DetailAppendixTable;
