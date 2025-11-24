import { FormikErrors, FormikHelpers, FormikProps, useFormik } from "formik";
import { IAppendix2Input, IAnswerTeacherShift, TeacherShift } from "../appendix2Type";
import { teacherShiftFormSchema } from "../teacherShiftValidation";
import { questionTeacherShift } from "@/shared/appendixData";
import { Dispatch, SetStateAction } from "react";

/**
 * Initial values for the Teacher Shift form.
 *
 * These defaults ensure the form is controlled and ready to validate with Yup.
 */
export const initialValuesTeacherShift: TeacherShift = {
  shift: "",
  section: "",
  boyNumber: 0,
  girlNumber: 0,
  boyDisabilityNumber: 0,
  girlDisabilityNumber: 0
};

/**
 * Props expected by the `useTeacherShiftForm` hook.
 *
 * - `setFieldValue` is typically provided by a parent Formik form managing Appendix 2.
 * - `teacherShiftData` is the current table of teacher shifts to which new entries are appended.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type UseTeacherShiftFormProps = {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<IAppendix2Input>>;
  teacherShiftData: TeacherShift[];
  setAnswers: Dispatch<SetStateAction<IAnswerTeacherShift[]>>;
};
/* eslint-enable @typescript-eslint/no-explicit-any */
/**
 * Type representing the return value of the `useTeacherShiftForm` hook.
 * It mirrors the Formik object for a `TeacherShift` form.
 */
export type UseTeacherShiftFormReturn = FormikProps<TeacherShift>;

/**
 * Hook that encapsulates a Formik instance for creating Teacher Shift rows.
 *
 * Contract
 * - Input: `setFieldValue` from parent Formik (Appendix 2 form) and the current `teacherShiftData` array.
 * - Output: A Formik object for a `TeacherShift` form (values, errors, handlers, submit, etc.).
 * - Side effects: On submit, it appends a new row (with incremental id) to `teacherShiftTable` in the parent form
 *   and resets the local form to initial values.
 *
 * Edge cases / Notes
 * - `id` is computed as `teacherShiftData.length + 1`; ensure parent cleans/normalizes ids if rows are removed.
 * - Validation uses `teacherShiftFormSchema` and runs on change and blur for immediate feedback.
 */
const useTeacherShiftForm = ({
  setFieldValue,
  teacherShiftData,
  setAnswers
}: UseTeacherShiftFormProps): UseTeacherShiftFormReturn => {
  const handleSubmit = async (
    values: TeacherShift,
    formikHelpers: FormikHelpers<TeacherShift>
  ): Promise<void> => {
    // Compute a simple incremental id based on current table length.
    const id = teacherShiftData.length + 1;

    const result = Object.entries(values).map(([key, value], index) => ({
      index: index + 1,
      question: (questionTeacherShift as Record<string, string>)[key],
      answer: value instanceof Date ? value.toISOString() : value
    }));
    setAnswers((prevAnswers) => [...prevAnswers, ...result]);
    // Append the new row to the parent `teacherShiftTable` and trigger validation.
    setFieldValue("teacherShiftTable", [...(teacherShiftData ?? []), { id, ...values }], true);

    // Reset local form to its initial state after a successful append.
    formikHelpers.resetForm();
        formikHelpers.setFieldValue("shift", "");
    formikHelpers.setFieldValue("section", Array.isArray(values.section) ? [] : "");
    formikHelpers.setFieldValue("boyNumber", 0);
    formikHelpers.setFieldValue("girlNumber", 0);
    formikHelpers.setFieldValue("boyDisabilityNumber", 0);
    formikHelpers.setFieldValue("girlDisabilityNumber", 0);
  };

  const formikAppendixGeneralDate = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesTeacherShift,
    validationSchema: teacherShiftFormSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAppendixGeneralDate;
};

export { useTeacherShiftForm };
