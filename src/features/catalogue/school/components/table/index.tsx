import { useRenderSchoolCell, headerColumns } from "./columns";
import { ISchoolColumnKey, ISchoolTable } from "../../schoolType";
import GenericTable from "@/components/ui/table/genericTable";
import { usePaginationApiQuery } from "@/shared/hooks/http/usePaginationApiQuery";

const SchoolTable = (): React.JSX.Element => {
  const {
    data: schoolList,
    meta,
    handleChangePage
  } = usePaginationApiQuery<ISchoolTable[]>({
    key: "schools-list",
    endpoint: "/catalogue/school",
    enabled: true,
    description: "centros escolares"
  });

  const renderSchoolCell = useRenderSchoolCell();

  return (
    <GenericTable
      items={schoolList}
      columns={headerColumns}
      renderCell={(item, key) => renderSchoolCell(item, key as ISchoolColumnKey)}
      ariaLabel="Tabla para mostrar los Centros escolares registrados"
      pagination={
        meta
          ? { currentPage: meta.currentPage, lastPage: meta.lastPage, onPageChange: handleChangePage }
          : undefined
      }
    />
  );
};

export default SchoolTable;
