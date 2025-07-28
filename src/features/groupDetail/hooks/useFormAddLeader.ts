import useAxios from "@/shared/hooks/useAxios";
import { FormikHelpers, useFormik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { number, object, ObjectSchema } from "yup";
import { LeaderFormResult, LeaderInput } from "../groupDetailType";

export const leaderShema: ObjectSchema<{ trainerId: number }> = object({
  trainerId: number()
    .required("El formador es requerida.")
    .min(1, "Por favor, seleccione una opción válida*.")
});

const useFormAddLeader = (groupId: number): LeaderFormResult => {
  const initialLeaderValues: LeaderInput = {
    trainerId: 0,
    groupId
  };

  const queryClient = useQueryClient();
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: LeaderInput,
    formikHelpers: FormikHelpers<LeaderInput>
  ): Promise<void> => {
    alert("Formador agregado correctamente");
  };

  const leaderFormik = useFormik({
    enableReinitialize: true,
    initialValues: initialLeaderValues,
    validationSchema: leaderShema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return { leaderFormik };
};

export { useFormAddLeader };
