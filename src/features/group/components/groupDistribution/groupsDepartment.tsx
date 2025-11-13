import { useDepartmentsList } from "../../hooks/useDepartmentsList";
import CustomProgress from "@/shared/ui/custom/customProgress";
import { useState } from "react";
import type { Selection } from "@heroui/react";
import { useGroupsByDepartment } from "../../hooks/useGroupsByDepartment";
import AccordionLayout from "./accordionLayout";

const GroupDistribution = (): React.JSX.Element => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["1"]));
  const { departmentListResult } = useDepartmentsList();

  const selectedDepartmentId = Array.from(selectedKeys)[0];
  const selectedDepartmentIdStr = selectedDepartmentId != null ? String(selectedDepartmentId) : "";

  const { groups } = useGroupsByDepartment(selectedDepartmentIdStr);

  if (!departmentListResult) return <CustomProgress />;

  const total = departmentListResult.departments.length;
  const size = Math.ceil(total / 3);
  const col1 = departmentListResult.departments.slice(0, size);
  const col2 = departmentListResult.departments.slice(size, size * 2);
  const col3 = departmentListResult.departments.slice(size * 2);

  return (
    <>
      <div className="flex justify-center items-center gap-6">
        <div className="bg-white px-6 py-3 rounded-full shadow-lg">
          <span className="text-sm mr-2">Total grupos:</span>
          <span className="text-xl font-semibold text-gray-900">{departmentListResult.totalGroups}</span>
        </div>
        <div className="bg-white px-6 py-3 rounded-full shadow-lg">
          <span className="text-sm mr-2">Total inscritos:</span>
          <span className="text-xl font-semibold text-gray-900">
            {departmentListResult.totalInscriptions}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AccordionLayout
          isLoading
          isError
          dataCol={col1}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          groups={groups}
        />
        <AccordionLayout
          isLoading
          isError
          dataCol={col2}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          groups={groups}
        />
        <AccordionLayout
          isLoading
          isError
          dataCol={col3}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          groups={groups}
        />
      </div>
    </>
  );
};

export default GroupDistribution;
