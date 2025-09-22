import { FormikHelpers, useFormik } from "formik";
import { IAttachment7Input, Attachment7Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { attachment7Schema } from "./attachmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Attachment7Input = {
  startDate: "",
  finishDate: "",
  descriptionMentoringProcess: "",
  achievements: "",
  areaImprovement: "",
  improvedNextCohort: ""
};

const useAttachment8Form = (): FormikProps<IAttachment7Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Attachment7Input,
    formikHelpers: FormikHelpers<IAttachment7Input>
  ): Promise<void> => {
    const startDateField = values.startDate;
    const finishDateField = values.finishDate;
    const descriptionMentoringProcessField = values.descriptionMentoringProcess;
    const achievementsField = values.achievements;
    const areaImprovementField = values.areaImprovement;
    const improvedNextCohortField = values.improvedNextCohort;

    const nameField = "Anexo 7";
    const data = [
      {
        name: nameField,
        textQuestion: "Fecha de inicio del proceso",
        textAnswer: startDateField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Fecha de finalización del proceso",
        textAnswer: finishDateField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          "Descripción breve del proceso de acompañamiento llevado a cabo, actividades realizadas, frecuencia de encuentros y estrategias utilizadas.",
        textAnswer: descriptionMentoringProcessField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Resumen de los logros alcanzados durante el proceso de mentoría",
        textAnswer: achievementsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          "Identificación de las áreas que aún necesitan mejora en el proceso de mentoría y en la práctica docente de los acompañados",
        textAnswer: areaImprovementField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Qué aspectos se han de mejorar en la mentoría para la siguiente cohorte?",
        textAnswer: improvedNextCohortField,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAttachment7Input>> = await useRequest.post(
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
        handleFormikResponseError<IAttachment7Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: attachment7Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAttachment8Form };
