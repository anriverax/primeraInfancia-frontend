import { FormikHelpers, useFormik } from "formik";
import { IAttachment6Input, Attachment6Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { attachment6Schema } from "./attachmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/functions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Attachment6Input = {
  objectiveSessionMet: "",
  themesPractice: "",
  feedbackBeenGiven: "",
  progressImplementingStrategies: "",
  difficultiesObserverd: "",
  teacherStrengths: "",
  mentorsReflections: "",
  supportNeeds: "",
  accompanimentBeenRecorded: ""
};

const useAttachment6Form = (): FormikProps<IAttachment6Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Attachment6Input,
    formikHelpers: FormikHelpers<IAttachment6Input>
  ): Promise<void> => {
    const objectiveSessionMetField = values.objectiveSessionMet;
    const themesPracticeField = values.themesPractice;
    const feedbackBeenGivenField = values.feedbackBeenGiven;
    const progressImplementingStrategiesField = values.progressImplementingStrategies;
    const difficultiesObserverdField = values.difficultiesObserverd;
    const teacherStrengthsField = values.teacherStrengths;
    const mentorsReflectionsField = values.mentorsReflections;
    const supportNeedsField = values.supportNeeds;
    const accompanimentBeenRecordedField = values.accompanimentBeenRecorded;

    const nameField = "Anexo 6";
    const data = [
      {
        name: nameField,
        textQuestion: "¿Se cumplió el objetivo de la sesión?",
        textAnswer: objectiveSessionMetField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Temas emergentes en la práctica",
        textAnswer: themesPracticeField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Se ha dado retroalimentación clara y aplicable?",
        textAnswer: feedbackBeenGivenField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿El o la docente ha demostrado avances en la implementación de las estrategias?",
        textAnswer: progressImplementingStrategiesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Dificultades observadas",
        textAnswer: difficultiesObserverdField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Fortalezas del docente",
        textAnswer: teacherStrengthsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Reflexiones del mentor/a",
        textAnswer: mentorsReflectionsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Necesidades de apoyo adicional",
        textAnswer: supportNeedsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Se ha registrado el proceso de acompañamiento?",
        textAnswer: accompanimentBeenRecordedField,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAttachment6Input>> = await useRequest.post(
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
        handleFormikResponseError<IAttachment6Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: attachment6Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAttachment6Form };
