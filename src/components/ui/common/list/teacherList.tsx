import { useDebouncedValue } from "@/shared/hooks/data/useDebouncedValue";
import { useCustomFormFields } from "@/shared/hooks/form/useCustomFormFields";
import { Input, Listbox, ListboxItem, SharedSelection } from "@heroui/react";
import { useState } from "react";
import { useTeachersList } from "./useTeachersList";

type TeacherListProps = {
  teacherIds: number[];
  supportId: number;
  handleSelectTeacher: (_keys: number[]) => void;
  limitCount: number;
  existingTeachers: number[];
};

const TeacherList = ({
  teacherIds,
  supportId,
  handleSelectTeacher,
  limitCount,
  existingTeachers = []
}: TeacherListProps): React.JSX.Element => {
  const [searchTeacher, setSearchTeacher] = useState<string>("");
  const { debouncedValue, isPending } = useDebouncedValue(searchTeacher, { delay: 300 });
  const { getInputProps } = useCustomFormFields();

  const { filteredTeachers, handleSelectionChange } = useTeachersList(
    supportId,
    debouncedValue,
    handleSelectTeacher,
    existingTeachers
  );

  return (
    <div className="w-full border-small px-1 py-2 rounded-lg border-default-200">
      <Listbox
        disallowEmptySelection
        itemClasses={{
          base: "data-[selected=true]:focus:bg-neutral-200 data-[hover=true]:bg-neutral-100",
          title: "text-[13px] text-neutral-500"
        }}
        classNames={{
          list: "max-h-[250px] overflow-y-auto"
        }}
        emptyContent="No tiene docentes asignados"
        items={filteredTeachers}
        selectedKeys={new Set(Array.from(teacherIds || []).map(String))}
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
            <p className="font-bold text-neutral-500 text-sm">Docentes activos</p>
          </div>
        }
        onSelectionChange={(keys: SharedSelection) => handleSelectionChange(keys, limitCount)}
      >
        {(item) => (
          <ListboxItem key={item.id}>
            <ul>
              <li>{item.fullName}</li>
              <li className="text-[11px] font-light text-neutral-500">{item.School.name}</li>
            </ul>
          </ListboxItem>
        )}
      </Listbox>
      <p className="text-right text-xs font-semibold text-neutral-500">
        Docentes seleccionados: {teacherIds.length} {limitCount <= 2 ? `/ ${limitCount}` : ""}
      </p>
    </div>
  );
};

export default TeacherList;
