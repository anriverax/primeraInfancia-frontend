import { SharedSelection } from "@heroui/react";
import { IAttendance, TeachersAssignmentWithEvents } from "../attendance.type";
import { useQueryRequest } from "@/shared/hooks/useQueryRequest";
import { FormikErrors } from "formik";

type AttendanceNewProps = {
  eventId: number;
  setFieldValue: (
    _field: string,
    _value: any,
    _shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IAttendance>>;
};

const useAttendanceNew = ({
  eventId,
  setFieldValue
}: AttendanceNewProps): {
  assignmentList: TeachersAssignmentWithEvents;
  handleSelectionChange: (_keys: SharedSelection) => void;
  getErrorTeacher: (teacherId?: string | string[] | undefined) => string | undefined;
} => {
  const { data: assignmentList } = useQueryRequest<TeachersAssignmentWithEvents>(
    "teachers-with-events",
    "/attendance/teachersWithEvents",
    true,
    "listado de eventos"
  );

  const handleSelectionChange = (keys: SharedSelection) => {
    const selectedIds = Array.from(keys as Iterable<unknown>)
      .map((k) => Number(k))
      .filter((n) => !isNaN(n));

    const currentEvent = assignmentList.events.find((e) => e.id === Number(eventId));

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

  const getErrorTeacher = (teacherId?: string | string[] | undefined) => {
    const errorTeacher = Array.isArray(teacherId)
      ? teacherId.filter(Boolean).join(", ")
      : (teacherId as string | undefined);

    return errorTeacher;
  };

  return {
    assignmentList: assignmentList as TeachersAssignmentWithEvents,
    handleSelectionChange,
    getErrorTeacher
  };
};

export { useAttendanceNew };
