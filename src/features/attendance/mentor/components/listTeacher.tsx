import { Alert, Autocomplete, AutocompleteItem, Chip, Select, SelectItem } from "@heroui/react";
import { Info, SearchIcon } from "lucide-react";
import { useMentor } from "../../hook/useMentor";
import { IAttendanceDetail, IMentorAssignmentBox } from "../../attendance.type";
import { useState } from "react";

type ListTeacherProps = {
  attendance: IAttendanceDetail;
};

const ListTeacher = ({ attendance }: ListTeacherProps): React.JSX.Element => {
  const [key, setValue] = useState<React.Key | null>(0);
  const { mentorAssignment, calculateDistance } = useMentor();

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const selectedTeacher = mentorAssignment.teachers.find((m) => m.id === parseInt(key as any));

  return (
    <div className="bg-white border border-gray-200">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          <h3 className="text-2xl font-semibold">Información de referencia</h3>
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Autocomplete
            fullWidth
            variant="bordered"
            defaultItems={mentorAssignment.selectBox}
            label="Docente seleccionado"
            placeholder="Buscar docente"
            startContent={<SearchIcon className="text-default-400" size={20} strokeWidth={2.5} />}
            selectedKey={key?.toString()}
            inputProps={{
              classNames: {
                inputWrapper:
                  "border data-[hover=true]:border-blue-500 data-[focus=true]:border-blue-500"
              }
            }}
            listboxProps={{
              emptyContent: "Docente que busca no existe"
            }}
            onSelectionChange={setValue}
          >
            {(item: IMentorAssignmentBox) => (
              <AutocompleteItem key={item.id}>{item.fullName}</AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <Select
          classNames={{
            trigger: "min-h-12 py-2"
          }}
          isMultiline={true}
          items={mentorAssignment.selectBox}
          label="Seleccionar docentes"
          placeholder="Select a user"
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item: any) => (
                  <Chip key={item.key} variant="shadow" color="primary">
                    {item.data.fullName}
                  </Chip>
                ))}
              </div>
            );
          }}
          selectionMode="multiple"
          variant="bordered"
        >
          {(user) => (
            <SelectItem key={user.id} textValue={user.fullName}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{user.fullName}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
        <p className="font-bold">Datos de referencia del Centro Escolar</p>
        {selectedTeacher && (
          <ul className="space-y-4 grid grid-cols-2">
            <li>
              <p className="font-bold">Código</p>
              <span>{selectedTeacher.School.code}</span>
            </li>
            <li>
              <p className="font-bold">Centro Escolar</p>
              <span>{selectedTeacher.School.name}</span>
            </li>
            <li>
              <p className="font-bold">Municipio / Distrito</p>
              <span>{selectedTeacher.School.location}</span>
            </li>
            <li>
              <p className="font-bold">Coordenadas</p>
              <span>{selectedTeacher.School.coordenates}</span>
            </li>
          </ul>
        )}
        {selectedTeacher && (
          <Alert
            color="primary"
            title={`Estas a ${calculateDistance(selectedTeacher.School.coordenates, attendance.coordenates)} km de ${selectedTeacher.School.name}`}
          />
        )}
      </div>
    </div>
  );
};

export default ListTeacher;
