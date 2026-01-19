import { useDepartmentsList } from "../../hooks/useDepartmentsList";
import CustomProgress from "@/shared/ui/customProgress";
import { useMemo, useState } from "react";
import type { Selection } from "@heroui/react";
import { useGroupsByDepartment } from "../../hooks/useGroupsByDepartment";
import AccordionLayout from "./accordionLayout";

const GroupDistribution = (): React.JSX.Element => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const { departmentListResult } = useDepartmentsList();

  const columns = useMemo(() => {
    if (!departmentListResult?.departments) return [[], [], []];
    const total = departmentListResult.departments.length;
    const size = Math.ceil(total / 3);
    return [
      departmentListResult.departments.slice(0, size),
      departmentListResult.departments.slice(size, size * 2),
      departmentListResult.departments.slice(size * 2)
    ];
  }, [departmentListResult]);

  const selectedDepartmentId = useMemo(() => {
    const id = Array.from(selectedKeys)[0];
    return id != null ? String(id) : "";
  }, [selectedKeys]);

  const { groups, isLoading, isError } = useGroupsByDepartment(selectedDepartmentId);

  if (!departmentListResult) return <CustomProgress />;

  return (
    <>
      <div className="flex justify-center items-center gap-6">
        <div className="px-6 py-3 rounded-full">
          <span className="text-sm mr-2">Total grupos:</span>
          <span className="text-xl font-semibold text-gray-900">{departmentListResult.totalGroups}</span>
        </div>
        <div className="px-6 py-3 rounded-full">
          <span className="text-sm mr-2">Total inscritos:</span>
          <span className="text-xl font-semibold text-gray-900">
            {departmentListResult.totalInscriptions}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {columns.map((col, idx) => (
          <AccordionLayout
            key={idx}
            isLoading={isLoading}
            isError={isError}
            dataCol={col}
            selectedKeys={selectedKeys}
            setSelectedKeys={setSelectedKeys}
            groups={groups}
          />
        ))}
      </div>
    </>
  );
};

export default GroupDistribution;
