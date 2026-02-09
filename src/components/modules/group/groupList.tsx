import React from "react";
import { Listbox, ListboxItem } from "@heroui/react";
import { DepartGroup } from "./group.type";

type DepartGroupProps = {
  setSelectedDepartment: React.Dispatch<React.SetStateAction<DepartGroup | null>>;
  groupData: DepartGroup[];
};

const GroupList = ({ groupData, setSelectedDepartment }: DepartGroupProps): React.JSX.Element => (
  <div>
    <Listbox
      aria-label="User Menu"
      className="p-0 gap-0 mt-2"
      itemClasses={{
        base: "py-1 first:rounded-t-lg last:rounded-b-lg rounded-none data-[hover=true]:bg-neutral-100/80"
      }}
    >
      {groupData.map((g) => (
        <ListboxItem
          classNames={{
            title:
              "flex justify-between text-[13px] items-center p-3 bg-white border border-neutral-200 rounded-lg"
          }}
          key={g.id}
          onClick={() => setSelectedDepartment(g)}
        >
          <p>{g.name}</p>
          {g.memberCount}
        </ListboxItem>
      ))}
    </Listbox>
  </div>
);

export default GroupList;
