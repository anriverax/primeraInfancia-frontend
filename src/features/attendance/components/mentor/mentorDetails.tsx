import { Button, Select, SelectItem } from "@heroui/react";
import { Calendar } from "lucide-react";
import { ILastAttendance } from "../../../../components/attendance/attendance.type";
import { useCustomFormFields } from "@/shared/hooks/useCustomFormFields";
import { ChangeEvent } from "react";
import { useAttendanceFinish } from "../../hook/useAttendanceFinish";
type ListTeacherProps = {
  selectedId: number;
  events: {
    id: number;
    name: string;
  }[];
  attendance?: ILastAttendance;
  handleSelectionChange: (_e: ChangeEvent<HTMLSelectElement>) => void;
};

const MentorDetail = ({
  selectedId,
  events,
  attendance,
  handleSelectionChange
}: ListTeacherProps): React.JSX.Element => {
  const { handleSubmit } = useAttendanceFinish();
  const { getSelectProps } = useCustomFormFields();

  return (
    <div className="border border-t-4 border-t-primary-300 rounded-2xl border-gray-200 bg-white p-6 w-1/2 space-y-6">
      <Select
        items={events}
        {...getSelectProps(
          "Evento",
          "Seleccione un evento",
          events.length || 0,
          selectedId,
          undefined,
          false
        )}
        isDisabled={!events.length}
        onChange={handleSelectionChange}
      >
        {events.map((event) => (
          <SelectItem key={event.id}>{event.name}</SelectItem>
        ))}
      </Select>
      {!attendance ? (
        <div className="p-4">No hay asistencia seleccionada</div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <Calendar className="w-6 h-6 text-blue-500" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">{attendance.event}</h2>
              <p className="text-gray-600">Modalidad: {attendance.modality}</p>
            </div>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto border border-gray-50 rounded-lg p-4 bg-gray-50">
            <h3 className="font-semibold text-gray-900 sticky top-0 bg-gray-50 pb-2">
              Lista de docentes ({attendance.details.length})
            </h3>
            <ul>
              {attendance.details.map((participant, index) => (
                <li key={`${participant.fullName}-${index}`}>
                  <span>{participant.fullName}</span>
                </li>
              ))}
            </ul>
          </div>
          <Button fullWidth color="primary" onPress={() => handleSubmit(attendance.id)}>
            Finalizar jornada
          </Button>
        </>
      )}
    </div>
  );
};

export default MentorDetail;
