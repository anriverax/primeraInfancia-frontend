import { useState } from "react";
import type { Selection } from "@heroui/react";
import { useDepartmentGroup } from "./hook/useDepartmentGroup";
import LoadingSkeleton from "@/components/ui/common/loadingSkeleton";
import { Accordion, AccordionItem, useDisclosure } from "@heroui/react";
import { DepartGroup, ExcelReadCompareResult } from "./group.type";
import GroupList from "./groupList";
// import ImportFile from "@/components/modules/group/upload/importFile";
// import GroupDetail from "./groupDetail";
import ModalLayout from "@/components/ui/modal/modalLayout";
import PersonTempTable from "./table/personTempTable";

const DepartmentGroup = (): React.JSX.Element => {
  const { isOpen, onOpenChange } = useDisclosure();
  const [personTempData, setPersonTempData] = useState<ExcelReadCompareResult | null>(null);
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const { dptGroupcolumns, isLoading } = useDepartmentGroup();
  const [selectedDepartment, setSelectedDepartment] = useState<DepartGroup | null>(null);
  console.log(setPersonTempData);
  console.log(selectedDepartment);
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        <div>
          {/*<ImportFile setPersonTempData={setPersonTempData} onOpenModal={onOpenChange} />*/}
          {/*{selectedDepartment && <GroupDetail groupData={selectedDepartment} />*/}
        </div>
        {dptGroupcolumns.map((col, idx) => (
          <Accordion
            key={`dpt-${idx}`}
            itemClasses={{
              base: "shadow-none border border-neutral-200 hover:cursor-pointer hover:bg-primary-200/10 hover:shadow-primary-500/50 mb-3 data-[open=true]:px-4 data-[open=true]:border data-[open=true]:bg-primary-200/10 data-[open=true]:border-neutral-200 data-[open=true]:rounded-lg transition-all",
              title: "hover:text-primary-500 font-bold data-[open=true]:text-primary-500"
            }}
            selectedKeys={selectedKeys}
            showDivider={false}
            variant="splitted"
            onSelectionChange={setSelectedKeys}
          >
            {col.map((department) => (
              <AccordionItem
                key={`department-${department.id}`}
                classNames={{
                  subtitle: "text-neutral-400 text-xs",
                  indicator: "text-primary-500 bg-primary-500/10 rounded-full p-1"
                }}
                title={
                  <div className="flex justify-between">
                    <div className="inline-flex text-sm items-center font-bold">{department.name}</div>
                    <div className="text-xs font-light bg-primary-500/10 text-primary-500 rounded-full px-2 flex justify-center items-center">{`${department.Group.length} grupos`}</div>
                  </div>
                }
                subtitle="Haz clic para expandir"
              >
                <GroupList
                  key={`departmentGroup-${department.id}`}
                  groupData={department.Group}
                  setSelectedDepartment={setSelectedDepartment}
                />
              </AccordionItem>
            ))}
          </Accordion>
        ))}
      </div>
      <ModalLayout size="lg" isOpen={isOpen} onOpenChange={onOpenChange}>
        <PersonTempTable personTempData={personTempData!} />
      </ModalLayout>
    </>
  );
};

export default DepartmentGroup;
