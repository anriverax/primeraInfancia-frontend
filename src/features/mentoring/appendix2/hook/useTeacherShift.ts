import { useCallback, useEffect, useState } from "react";
import { Appendix2Input, TeacherShift } from "../appendix2Type";
import { FormikErrors } from "formik";

type UseTeacherShiftProps = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<Appendix2Input>>;
};
interface UseTeacherShiftReturn {
  teacherShiftTable: TeacherShift[];
  onSubmitTeacherShift: (teacherShift: TeacherShift) => void;
  onDeleteTeacherShift: (id: number) => void;
}

const useTeacherShift = ({ setFieldValue }: UseTeacherShiftProps): UseTeacherShiftReturn => {
  const [teacherShiftTable, setTeacherShiftTable] = useState<TeacherShift[]>([]);

  const onSubmitTeacherShift = useCallback((teacherShift: TeacherShift) => {
    const id = teacherShiftTable.length + 1;
    setTeacherShiftTable((prev) => [...prev, { id, ...teacherShift }]);
  }, []);

  const onDeleteTeacherShift = useCallback((id: number) => {
    setTeacherShiftTable((prev) => prev.filter((entry) => entry.id && entry.id !== id));
  }, []);

  useEffect(() => {
    if (teacherShiftTable.length > 0) {
      setFieldValue("shift", "");
      setFieldValue("section", "");
      setFieldValue("boyNumber", 0);
      setFieldValue("girlNumber", 0);
      setFieldValue("boyDisabilityNumber", 0);
      setFieldValue("girlDisabilityNumber", 0);
    }
  }, [teacherShiftTable]);

  return {
    teacherShiftTable,
    onSubmitTeacherShift,
    onDeleteTeacherShift
  };
};

export { useTeacherShift };
