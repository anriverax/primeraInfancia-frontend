import { SharedSelection } from "@heroui/react";
import { EventList, IAttendance } from "../attendance.type";
import { FormikErrors } from "formik";
import { IPerson } from "@/shared/types/globals";

type AttendanceNewProps = {
  eventId: number;
  setFieldValue: (
    _field: string,
    _value: Set<number>,
    _shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IAttendance>>;
  assignmentList: EventList[];
};

const useAttendanceNew = ({
  eventId,
  setFieldValue,
  assignmentList
}: AttendanceNewProps): {
  handleSelectionChange: (_keys: SharedSelection) => void;
  getErrorTeacher: (_teacherId?: string | string[] | undefined) => string | undefined;
  mentors?: IPerson[];
} => {
  /*
  const isTech = rol === TypeRole.USER_TECNICO_APOYO;
  const isMentor = rol === TypeRole.USER_MENTOR;
  const isLeader = rol === TypeRole.USER_FORMADOR;

  // Cargar mentores asignados al técnico (solo si es técnico)

  const { data: mentors } = useApiQuery<IPerson[]>(`mentors-by-tech`, "/attendance/me/mentors", {
    enabled: Boolean(isTech),
    description: "listado de mentores"
  });
*/
  // Endpoint y habilitación para teachers-with-events

  const handleSelectionChange = (keys: SharedSelection): void => {
    // Convertir Set<string> a Array de strings
    const selectedIds = Array.from(keys as Set<string>);
    console.log({ selectedIds });

    const currentEvent = assignmentList.find((e) => e.id === Number(eventId));

    const limits: Record<string, number> = {
      individual: 1,
      pareja: 2
    };

    const selectionLimit =
      Object.entries(limits).find(([key]) => currentEvent?.name.toLowerCase().includes(key))?.[1] ??
      null;

    // Aplicar límite si existe
    const limitedSelection = selectionLimit ? selectedIds.slice(-selectionLimit) : selectedIds;

    // Convertir a números y crear un Set para Formik
    const numbersSet = new Set(limitedSelection.map((id) => Number(id)));

    setFieldValue("teacherId", numbersSet);
  };

  const getErrorTeacher = (teacherId?: string | string[] | undefined): string | undefined => {
    const errorTeacher = Array.isArray(teacherId)
      ? teacherId.filter(Boolean).join(", ")
      : (teacherId as string | undefined);

    return errorTeacher;
  };

  return {
    handleSelectionChange,
    getErrorTeacher
  };
};

export { useAttendanceNew };
