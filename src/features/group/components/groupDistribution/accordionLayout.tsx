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

const AccordionLayout = ({
  dataCol,
  selectedKeys,
  setSelectedKeys,
  groups,
  isLoading,
  isError
}: AccordionLayoutProps): React.JSX.Element => (
  <Accordion
    disallowEmptySelection
    itemClasses={{
      base: "hover:bg-default-50 hover:cursor-pointer"
    }}
    variant="splitted"
    selectedKeys={selectedKeys}
    onSelectionChange={setSelectedKeys}
  >
    {dataCol.map((department) => (
      <AccordionItem
        key={department.id}
        title={
          <div className="flex justify-between">
            <div>{department.name}</div>
            <div>{`${department._count.Group} grupos`}</div>
          </div>
        }
        subtitle="Hacer click para expandir"
      >
        <GroupListComponent groups={groups} isLoading={isLoading} isError={isError} />
      </AccordionItem>
    ))}
  </Accordion>
);

export default AccordionLayout;
