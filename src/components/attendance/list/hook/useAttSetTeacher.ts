import { SharedSelection } from "@heroui/react";
import { FormikErrors } from "formik";
import { MAX_MENTORSHIP_PARTICIPANTS } from "@/shared/constants";
import { AttStepTwoInput, EventList } from "../../attendance.type";

type AttSetTeacherProps = {
  eventInstanceId: number;
  setFieldValue: (
    _field: string,
    _value: number[],
    _shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<AttStepTwoInput>>;
  assignmentList: EventList[];
};

const useAttSetTeacher = ({
  eventInstanceId,
  setFieldValue,
  assignmentList
}: AttSetTeacherProps): {
  handleSelectTeacher: (_keys: SharedSelection) => void;
} => {
  const handleSelectTeacher = (keys: SharedSelection): void => {
    // Convertir Set<string> a Array de strings
    const selectedIds = Array.from(keys as Set<string>);
    const currentEvent = assignmentList.find((e) => e.id === Number(eventInstanceId));

    const selectionLimit =
      Object.entries(MAX_MENTORSHIP_PARTICIPANTS).find(([key]) =>
        currentEvent?.name.toLowerCase().includes(key)
      )?.[1] ?? null;

    const limitedSelection = selectionLimit ? selectedIds.slice(-selectionLimit) : selectedIds;
    const numbersSet = new Set(limitedSelection.map((id) => Number(id)));

    setFieldValue("teacherId", Array.from(numbersSet));
  };

  return {
    handleSelectTeacher
  };
};

export { useAttSetTeacher };
