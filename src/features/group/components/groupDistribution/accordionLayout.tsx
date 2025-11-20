import { Accordion, AccordionItem } from "@heroui/react";
import { DepartmentGroupCount, GroupList } from "../../groupType";
import { Dispatch, SetStateAction } from "react";
import type { Selection } from "@heroui/react";
import GroupListComponent from "./groupList";

type AccordionLayoutProps = {
  dataCol: DepartmentGroupCount[];
  selectedKeys: Selection;
  setSelectedKeys: Dispatch<SetStateAction<Selection>>;
  groups: GroupList[];
  isLoading: boolean;
  isError: boolean;
};
// px-4 bg-content1 shadow-medium rounded-medium hover:cursor-pointer
const AccordionLayout = ({
  dataCol,
  selectedKeys,
  setSelectedKeys,
  groups,
  isLoading,
  isError
}: AccordionLayoutProps): React.JSX.Element => (
  <Accordion
    itemClasses={{
      base: "hover:cursor-pointer data-[open=true]:px-4 data-[open=true]:shadow-custom-shadow data-[open=true]:rounded-medium transition-all"
    }}
    selectedKeys={selectedKeys}
    onSelectionChange={setSelectedKeys}
  >
    {dataCol.map((department) => (
      <AccordionItem
        key={department.id}
        title={
          <div className="flex justify-between">
            <div className="inline-flex items-center font-medium text-blue-700">
              {department.name}
            </div>
            <div className='text-xs'>{`${department._count.Group} grupos`}</div>
          </div>
        }
        subtitle="Haz clic para expandir"
      >
        <GroupListComponent groups={groups} isLoading={isLoading} isError={isError} />
      </AccordionItem>
    ))}
  </Accordion>
);

export default AccordionLayout;
