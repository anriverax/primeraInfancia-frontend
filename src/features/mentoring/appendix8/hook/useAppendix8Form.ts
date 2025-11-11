import { FormikHelpers, useFormik, FormikProps } from "formik";
import { Appendix8Input, IAppendix8Input } from "../appendix8Type";
import { appendix8Schema } from "../appendix8Validation";
import { questionsAppendix8 } from "@/shared/appendixData";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import useAxios from "@/shared/hooks/useAxios";
import { confirmAction, handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { useRouter } from "next/navigation";

const initialValuesAppendix8: Appendix8Input = {
  //Section A
  relateToDailyLife: "",
  usePriorKnowledge: "",
  promoteParticipation: "",
  intentionalDevelopment: "",
  integratePlay: "",
  buildSecureSpace: "",
  spaceAlignmentToGoals: "",
  organizeZoneCriteria: "",
  selectAppropriateMaterials: "",
  renewZoneCapacity: "",
  promoteFreeZoneRotation: "",
  holisticDevelopmentFocus: "",
  facilitatePeerInteraction: "",
  promoteEmotionalExpression: "",
  observeListenMediateSupport: "",
  knowledgeAndUse: "",
  curriculumAdaptation: "",
  implementWorkshops: "",
  implementProjects: "",
  implementAssembly: "",
  varyStudentGrouping: "",
  planTransitions: "",
  organizeRoutineCriteria: "",
  useAnticipationTools: "",
  addressNeedsViaSchedule: "",
  flexibleRespectfulTiming: "",
  clearCoherentSchedule: "",
  integratesDesignElements: "",
  involveFamilies: "",
  usesVariedTools: "",
  documentsObservations: "",
  flexibleInclusiveDesign: "",
  individualizedSupportiveAssessment: "",
  //Section B
  affectiveEnvironment: "",
  fosterResponsibilityAutonomy: "",
  cozySafeEnjoyable: "",
  positiveAttitudeRoutines: "",
  usePositiveFeedback: "",
  respectfulAffectionateTreatment: "",
  listenToInterests: "",
  addressChildNeeds: "",
  promoteEmpathyConflict: "",
  fosterTeamworkCollaboration: "",
  promoteFreeExpression: "",
  //Section C
  promoteFamilyParticipation: "",
  listenToOpinions: "",
  receptiveToProposals: "",
  facilitateCollaborationActivities: "",
  considerFamilyContext: "",
  communicateProgressMechanisms: "",
  adherenceToComprehensiveCare: "",
  //Section D
  setRealisticGoals: "",
  selfAssessPractice: "",
  peerEvaluateForImprovement: "",
  sharePracticeActivities: "",
  teamConsensusPlanning: "",
  manageVirtualClassroom: "",
  useGoogleProductivity: "",
  useAgeAppropriateResources: "",
  integrateAudiovisualTools: ""
};

const useAppendix8Form = (appendixId: number, inscriptionId: number): FormikProps<Appendix8Input> => {
  const useRequest = useAxios(true);
  const router = useRouter();

  const handleSubmit = async (
    values: Appendix8Input,
    formikHelpers: FormikHelpers<IAppendix8Input>
  ): Promise<void> => {
    const confirmed = await confirmAction({
      title: "Confirmar envío",
      text: "¿Estás seguro de que deseas enviar el acuerdo?",
      btnText: "Sí, enviar"
    });

    if (!confirmed) return;

    const result = Object.entries(values).map(([key, value], index) => ({
      index: index + 1,
      questionText: (questionsAppendix8 as Record<string, string>)[key],
      valueAnswer: value instanceof Date ? value.toISOString() : value
    }));

    const appendixData = {
      appendixId,
      survey: result,
      inscriptionId
    };

    try {
      const res: AxiosResponse<FetchResponse<IAppendix8Input>> = await useRequest.post(
        "/surveyData/create",
        appendixData
      );

      const resultData = res.data;

      if (resultData.statusCode === HttpStatusCode.Created) {
        formikHelpers.resetForm();
        showToast(String(resultData.message), "success");
        router.back();
      }
    } catch (error) {
      handleFormikResponseError<IAppendix8Input>(error as AxiosError, formikHelpers!);
    }
  };

  const formikAppendix8 = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesAppendix8,
    validationSchema: appendix8Schema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit
  });

  return formikAppendix8;
};

export { useAppendix8Form };
