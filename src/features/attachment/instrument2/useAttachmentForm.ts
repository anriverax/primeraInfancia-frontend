import { FormikHelpers, useFormik } from "formik";
import { IAttachment2Input, Attachment2Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { attachment2Schema } from "./attachmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Attachment2Input = {
  educationalLevelServed: "",
  childrenAge: "",
  yearsExperiencie: "",
  initialTraining: "",
  hasRecentlyParticipated: "",
  hasRecentlyParticipatedDetail: "",
  knowledgeChildDevelopment: "",
  planningLearningExperiences: "",
  attentionEducationalInclusion: "",
  gameExplorationStrategies: "",
  assessmentLearning: "",
  relationshipFamilies: "",
  managementEducationalEnvironment: "",
  others: "",
  aspectsImprove: "",
  challengesAtClassroom: "",
  whatExpect: "",
  anythingElse: "",
  mentorObservations: ""
};

const useAttachment2Form = (): FormikProps<IAttachment2Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Attachment2Input,
    formikHelpers: FormikHelpers<IAttachment2Input>
  ): Promise<void> => {
    const educationalLevelServedField = values.educationalLevelServed;
    const childrenAgeField = values.childrenAge;
    const yearsExperiencieField = values.yearsExperiencie;
    const initialTrainingField = values.initialTraining;
    const hasRecentlyParticipatedField = values.hasRecentlyParticipated;
    const hasRecentlyParticipatedDetailField = values.hasRecentlyParticipatedDetail;
    const knowledgeChildDevelopmentField = values.knowledgeChildDevelopment;
    const planningLearningExperiencesField = values.planningLearningExperiences;
    const attentionEducationalInclusionField = values.attentionEducationalInclusion;
    const gameExplorationStrategiesField = values.gameExplorationStrategies;
    const assessmentLearningField = values.assessmentLearning;
    const relationshipFamiliesField = values.relationshipFamilies;
    const managementEducationalEnvironmentField = values.managementEducationalEnvironment;
    const othersField = values.others;
    const aspectsImprove = values.aspectsImprove;
    const challengesAtClassroom = values.challengesAtClassroom;
    const whatExpect = values.whatExpect;
    const anythingElse = values.anythingElse;
    const mentorObservations = values.mentorObservations;

    const nameField = "Anexo 2";
    const data = [
      {
        name: nameField,
        textQuestion: "Nivel educativo que atiende",
        textAnswer: educationalLevelServedField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Edad de los niños y niñas",
        textAnswer: childrenAgeField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Años de experiencia docente",
        textAnswer: yearsExperiencieField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Cuál es su formación inicial?",
        textAnswer: initialTrainingField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Ha participado recientemente en procesos de formación continua?",
        textAnswer: hasRecentlyParticipatedField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Si respondió sí, ¿cuáles?",
        textAnswer: hasRecentlyParticipatedDetailField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Conocimiento del desarrollo infantil",
        textAnswer: knowledgeChildDevelopmentField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Planificación de experiencias de aprendizaje",
        textAnswer: planningLearningExperiencesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Atención a la inclusión educativa",
        textAnswer: attentionEducationalInclusionField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Estrategias de juego y exploración",
        textAnswer: gameExplorationStrategiesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Evaluación de los aprendizajes",
        textAnswer: assessmentLearningField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Relación con las familias",
        textAnswer: relationshipFamiliesField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Gestión del ambiente educativo",
        textAnswer: managementEducationalEnvironmentField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Otros",
        textAnswer: othersField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿En qué aspectos le gustaría mejorar o profundizar su práctica?",
        textAnswer: aspectsImprove,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Qué desafíos enfrenta actualmente en su aula?",
        textAnswer: challengesAtClassroom,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "¿Qué espera del proceso de mentoría o acompañamiento?",
        textAnswer: whatExpect,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion:
          "¿Hay algo que considere importante que el personal mentor conozca para apoyar mejor su proceso?",
        textAnswer: anythingElse,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Observaciones del personal mentor",
        textAnswer: mentorObservations,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];

    let countItem = 0;
    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAttachment2Input>> = await useRequest.post(
          "/appendix-test/create",
          item
        );

        const resultData = res.data;
        countItem++;
        if (resultData.statusCode === 201 && countItem == data.length)
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
        handleFormikResponseError<IAttachment2Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: attachment2Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAttachment2Form };
