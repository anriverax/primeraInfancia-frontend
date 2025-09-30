import { FormikHelpers, useFormik } from "formik";
import { IAttachment3Input, Attachment3Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { attachment3Schema } from "./attachmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Attachment3Input = {
  dimension: "",
  subdimension: "",
  goal: "",
  activities: "",
  resources: "",
  tempo: "",
  successIndicators: "",
  levelAchievement: "",
  classrromObservations: "",
  observationRoutine: "",
  dialoguedFeedback: "",
  modelingPractices: "",
  coPlanningActivities: "",
  portfolioReview: "",
  analysisEvidence: "",
  other: "",
};

const useAttachment3Form = (): FormikProps<IAttachment3Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Attachment3Input,
    formikHelpers: FormikHelpers<IAttachment3Input>
  ): Promise<void> => {
    const dimensionField = values.dimension;
    const subdimensionField = values.subdimension;
    const goalField = values.goal;
    const activitiesField = values.activities;
    const resourcesField = values.resources;
    const timeField = values.tempo;
    const successIndicatorsField = values.successIndicators;
    const levelAchievementField = values.levelAchievement;
    const classrromObservationsField = values.classrromObservations;
    const observationRoutineField = values.observationRoutine;
    const dialoguedFeedbackField = values.dialoguedFeedback;
    const modelingPracticesField = values.modelingPractices;
    const coPlanningActivitiesField = values.coPlanningActivities;
    const portfolioReviewField = values.portfolioReview;
    const analysisEvidenceField = values.analysisEvidence;
    const otherField = values.other;
    
    const nameField = "Anexo 3";
    const data = [
      {
        name: nameField,
        textQuestion: "Dimensión",
        textAnswer: dimensionField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Subdimensión",
        textAnswer: subdimensionField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Objetivos",
        textAnswer: goalField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Actividades",
        textAnswer: activitiesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Recursos",
        textAnswer: resourcesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Temporización",
        textAnswer: timeField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Indicadores de éxito",
        textAnswer: successIndicatorsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Nivel de logro",
        textAnswer: levelAchievementField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Observación de clases",
        textAnswer: classrromObservationsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Observación de la rutina",
        textAnswer: observationRoutineField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Retroalimentación dialogada",
        textAnswer: dialoguedFeedbackField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Modelado de prácticas",
        textAnswer: modelingPracticesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Co-planificación de actividades",
        textAnswer: coPlanningActivitiesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Revisión conjunta de portafolios",
        textAnswer: portfolioReviewField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Análisis de evidencias de aprendizaje",
        textAnswer: analysisEvidenceField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Otras:",
        textAnswer: otherField,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAttachment3Input>> = await useRequest.post(
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
        handleFormikResponseError<IAttachment3Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: attachment3Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAttachment3Form };
