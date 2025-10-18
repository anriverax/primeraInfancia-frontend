import { FormikHelpers, useFormik } from "formik";
import { IAttachment5Input, Attachment5Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { attachment5Schema } from "./attachmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/functions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Attachment5Input = {
  mentorObserve: "",
  challengeClassroom: "",
  emotionalManagment: "",
  whatImprove: "",
  practiceHighlights: "",
  emotionalBond: "",
  identifiedPotentials: "",
  dilemmansObserved: "",
  questionsDidWeAsk: "",
  lessonsEmerged: "",
  improvementNextSession: "",
  changesTeachingStaff: "",
  evidenceObserved: "",
  mentorRecommendations: ""
};

const useAttachment5Form = (): FormikProps<IAttachment5Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Attachment5Input,
    formikHelpers: FormikHelpers<IAttachment5Input>
  ): Promise<void> => {
    const mentorObserveField = values.mentorObserve;
    const challengeClassroomField = values.challengeClassroom;
    const emotionalManagmentField = values.emotionalManagment;
    const whatImproveField = values.whatImprove;
    const practiceHighlightsField = values.practiceHighlights;
    const emotionalBondField = values.emotionalBond;
    const identifiedPotentialsField = values.identifiedPotentials;
    const dilemmansObservedField = values.dilemmansObserved;
    const questionsDidWeAskField = values.questionsDidWeAsk;
    const lessonsEmergedField = values.lessonsEmerged;
    const improvementNextSessionField = values.improvementNextSession;
    const changesTeachingStaffField = values.changesTeachingStaff;
    const evidenceObservedField = values.evidenceObserved;
    const mentorRecommendationsField = values.mentorRecommendations;

    const nameField = "Anexo 5";
    const data = [
      {
        name: nameField,
        textQuestion: "¿Qué me interesa que observe mi mentor/a?",
        textAnswer: mentorObserveField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Qué dificultades recientes ha tenido en el aula?",
        textAnswer: challengeClassroomField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Soy consciente de mi gestión emocional en las diferentes situaciones?",
        textAnswer: emotionalManagmentField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿En qué quiero mejorar?",
        textAnswer: whatImproveField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Aspectos destacados de la práctica",
        textAnswer: practiceHighlightsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Creación de vínculo emocional que posibilite la confianza mutua",
        textAnswer: emotionalBondField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Potencialidades identificadas",
        textAnswer: identifiedPotentialsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Dilemas o tensiones observadas",
        textAnswer: dilemmansObservedField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Qué preguntas nos hicimos mutuamente?",
        textAnswer: questionsDidWeAskField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Aprendizajes que emergieron",
        textAnswer: lessonsEmergedField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Compromiso de mejora para la próxima sesión",
        textAnswer: improvementNextSessionField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Qué cambios implementó el personal docente desde la última sesión?",
        textAnswer: changesTeachingStaffField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Evidencias observadas",
        textAnswer: evidenceObservedField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Recomendaciones del mentor",
        textAnswer: mentorRecommendationsField,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAttachment5Input>> = await useRequest.post(
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
        handleFormikResponseError<IAttachment5Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: attachment5Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAttachment5Form };
