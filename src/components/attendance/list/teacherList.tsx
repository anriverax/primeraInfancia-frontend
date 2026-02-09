import { useDebouncedValue } from "@/shared/hooks/data/useDebouncedValue";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { Input, Listbox, ListboxItem, SharedSelection } from "@heroui/react";
import { useState } from "react";
import { useTeachersList } from "./hook/useTeachersList";

type TeacherListProps = {
  teacherId: number[];
  supportId: number;
  handleSelectTeacher: (_keys: SharedSelection) => void;
};

const TeacherList = ({
  teacherId,
  supportId,
  handleSelectTeacher
}: TeacherListProps): React.JSX.Element => {
  const [searchTeacher, setSearchTeacher] = useState<string>("");
  const { debouncedValue, isPending } = useDebouncedValue(searchTeacher, { delay: 300 });
  const { getInputProps } = useCustomFormFields();

  const { filteredTeachers } = useTeachersList(supportId, debouncedValue);

  return (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200">
      <Listbox
        disallowEmptySelection
        classNames={{
          list: "max-h-[250px] overflow-y-auto"
        }}
        emptyContent="No tiene docentes asignados"
        items={filteredTeachers}
        selectedKeys={new Set(Array.from(teacherId || []).map(String))}
        aria-label="Dynamic Actions"
        selectionMode="multiple"
        topContent={
          <div>
            <div className="mb-3">
              <Input
                isClearable
                value={searchTeacher}
                description={isPending ? "Buscando..." : isPending}
                {...getInputProps("text", "Buscar docente por nombre", undefined, undefined, false)}
                onValueChange={setSearchTeacher}
              />
            </div>
            <p className="font-bold text-gray-600 text-sm">Docentes activos</p>
          </div>
        }
        onSelectionChange={(keys: SharedSelection) => handleSelectTeacher(keys)}
      >
        {(item) => (
          <ListboxItem key={item.id}>
            <ul>
              <li>{item.fullName}</li>
              <li className="text-default-400 text-xs">{item.School.name}</li>
            </ul>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  );
};

export default TeacherList;
