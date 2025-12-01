import { SharedSelection } from "@heroui/react";
import { EventList, IAttendance, TeachersAssignmentWithEvents } from "../attendance.type";
import { useApiQuery } from "@/shared/hooks/useApiQuery";
import { FormikErrors } from "formik";
import { useMemo } from "react";
import { IPerson } from "@/shared/types/globals";
import { TypeRole } from "@/shared/constants";

type AttendanceNewProps = {
  eventId: number;
  setFieldValue: (
    _field: string,
    _value: number[],
    _shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IAttendance>>;
  rol?: string | undefined;
  mentorId?: number | undefined;
};

const useAttendanceNew = ({
  eventId,
  setFieldValue,
  rol,
  mentorId
}: AttendanceNewProps): {
  assignmentList: EventList[];
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

  const { data: assignmentList } = useApiQuery<EventList[]>("event-list", "/events", {
    enabled: true,
    description: "listado de eventos"
  });

  const handleSelectionChange = (keys: SharedSelection): void => {
    const selectedIds = Array.from(keys as Iterable<unknown>)
      .map((k) => Number(k))
      .filter((n) => !isNaN(n));

    const currentEvent = assignmentList.find((e) => e.id === Number(eventId));

    const limits: Record<string, number> = {
      individual: 1,
      pareja: 2
    };

    const selectionLimit =
      Object.entries(limits).find(([key]) => currentEvent?.name.toLowerCase().includes(key))?.[1] ??
      null;

    const limitedSelection = selectionLimit ? selectedIds.slice(-selectionLimit) : selectedIds;

    setFieldValue("teacherId", limitedSelection);
  };

  const getErrorTeacher = (teacherId?: string | string[] | undefined): string | undefined => {
    const errorTeacher = Array.isArray(teacherId)
      ? teacherId.filter(Boolean).join(", ")
      : (teacherId as string | undefined);

    return errorTeacher;
  };

  return {
    assignmentList,
    handleSelectionChange,
    getErrorTeacher
  };
};

export { useAttendanceNew };
