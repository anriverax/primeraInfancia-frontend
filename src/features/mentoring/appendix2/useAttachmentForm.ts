import { FormikHelpers, useFormik } from "formik";
import { IAppendix2Input, Appendix2Input } from "./type";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { appendix2Schema } from "./attchmentValidation";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError, showToast } from "@/shared/utils/funtions";
import useAxios from "@/shared/hooks/useAxios";

const initialValues: Appendix2Input = {
  detailChildren: [],
  yearsExperiencie: "",
  initialTraining: "",
  hasPostgraduate: "",
  postgraduateDetail: "",
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
  mentorObservations: "",
};

const useAppendix2Form = (): FormikProps<IAppendix2Input> => {
  const useRequest = useAxios(true);

  const handleSubmit = async (
    values: Appendix2Input,
    formikHelpers: FormikHelpers<IAppendix2Input>
  ): Promise<void> => {
   const detailChildrenField =values.detailChildren;
     const yearsExperiencieField =values.yearsExperiencie;
     const initialTrainingField =values.initialTraining;
     const hasPostgraduateField =values.hasPostgraduate;
     const postgraduateDetailField =values.postgraduateDetail;
     const hasRecentlyParticipatedField =values.hasRecentlyParticipated;
     const hasRecentlyParticipatedDetailField =values.hasRecentlyParticipatedDetail;
     const knowledgeChildDevelopmentField =values.knowledgeChildDevelopment;
     const planningLearningExperiencesField =values.planningLearningExperiences;
     const attentionEducationalInclusionField =values.attentionEducationalInclusion;
     const gameExplorationStrategiesField =values.gameExplorationStrategies;
     const assessmentLearningField =values.assessmentLearning;
     const relationshipFamiliesField =values.relationshipFamilies;
     const managementEducationalEnvironmentField =values.managementEducationalEnvironment;
     const othersField =values.others;
     const aspectsImproveField =values.aspectsImprove;
     const challengesAtClassroomField =values.challengesAtClassroom;
     const whatExpectField =values.whatExpect;
     const anythingElseField =values.anythingElse;
     const mentorObservationsField =values.mentorObservations;
    const nameField = "Anexo 2";

       const data = [

      {
        name: nameField,
        textQuestion: "Fecha estimada de cierre",
        textAnswer: detailChildrenField,
        teacherRoleId: 1,
        mentorRoleId: 2
      },
      {
        name: nameField,
        textQuestion: "Frecuencia estimada de encuentros",
        textAnswer: yearsExperiencieField,
        teacherRoleId: 1,
        mentorRoleId: 2
      }
    ];

    data.map(async (item) => {
      try {
        const res: AxiosResponse<FetchResponse<IAppendix2Input>> = await useRequest.post(
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
        handleFormikResponseError<IAppendix2Input>(error as AxiosError, formikHelpers!);
      }
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: appendix2Schema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useAppendix2Form };
