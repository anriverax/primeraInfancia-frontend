import { SharedSelection } from "@heroui/react";
import { EventList, IAttendance } from "../attendance.type";
import { FormikErrors } from "formik";
import { MAX_MENTORSHIP_PARTICIPANTS } from "@/shared/constants";

type AttendanceUtilsProps = {
  eventInstanceId: number;
  setFieldValue: (
    _field: string,
    _value: number[],
    _shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<IAttendance>>;
  assignmentList: EventList[];
};

const useAttendanceUtils = ({
  eventInstanceId,
  setFieldValue,
  assignmentList
}: AttendanceUtilsProps): {
  handleSelectionChange: (_keys: SharedSelection) => void;
} => {
  const handleSelectionChange = (keys: SharedSelection): void => {
    // Convertir Set<string> a Array de strings
    const selectedIds = Array.from(keys as Set<string>);
    const currentEvent = assignmentList.find((e) => e.id === Number(eventInstanceId));

    const selectionLimit =
      Object.entries(MAX_MENTORSHIP_PARTICIPANTS).find(([key]) =>
        currentEvent?.name.toLowerCase().includes(key)
      )?.[1] ?? null;

    // Aplicar límite si existe
    const limitedSelection = selectionLimit ? selectedIds.slice(-selectionLimit) : selectedIds;

    // Convertir a números y crear un Set para Formik
    const numbersSet = new Set(limitedSelection.map((id) => Number(id)));

    setFieldValue("teacherId", Array.from(numbersSet));
  };

  return {
    handleSelectionChange
  };
};

export { useAttendanceUtils };
