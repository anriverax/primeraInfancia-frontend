import { FormikHelpers, useFormik } from "formik";
import { IAppendix1Input, Appendix1Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { appendix1Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix1Input = {
  finishDate: new Date(),
  frequencyOfEncounters: "",
};

const useAppendix1Form = (): FormikProps<IAppendix1Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix1Input,
    formikHelpers: FormikHelpers<IAppendix1Input>
  ): Promise<void> => {
    const finishDateField = values.finishDate;
    const frequencyOfEncountersField = values.frequencyOfEncounters;
console.log(finishDateField,frequencyOfEncountersField,"##");

    const nameField = "Anexo 1";
    const data = [
      {
        name: nameField,
        textQuestion: "Fecha estimada de cierre",
        textAnswer: finishDateField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Frecuencia estimada de encuentros",
        textAnswer: frequencyOfEncountersField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
    ];

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendix1Input>> = await useRequest.post(
          "/appendix-test/create",
          item
        );

        const resultData = res.data;

        showToast(String(resultData.message), "success");

        if (
          resultData.statusCode === HttpStatusCode.Created ||
          resultData.statusCode === HttpStatusCode.Ok
        ) {
          // /* eslint-disable @typescript-eslint/no-explicit-any */
          // const newData: IAttendanceCreated = resultData.data as any;
          // /* eslint-enable @typescript-eslint/no-explicit-any */
          // setDataAttendance(newData);
        }
      } catch (error) {
        handleFormikResponseError<IAppendix1Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: appendix1Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAppendix1Form };
