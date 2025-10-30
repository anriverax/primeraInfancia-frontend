import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix8Input {
  //Secction A
   relateToDailyLife: string;
   usePriorKnowledge: string;
   promoteParticipation: string;
   intentionalDevelopment: string;
   integratePlay: string;
   buildSecureSpace: string;
   spaceAlignmentToGoals: string;
   organizeZoneCriteria: string;
   selectAppropriateMaterials: string;
   renewZoneCapacity: string;
   promoteFreeZoneRotation: string;
   holisticDevelopmentFocus: string;
   facilitatePeerInteraction: string;
   promoteEmotionalExpression: string;
   observeListenMediateSupport: string;
   knowledgeAndUse: string;
   curriculumAdaptation: string;
   implementWorkshops:string;
   implementProjects:string;
   implementAssembly:string;
   varyStudentGrouping:string;
   planTransitions:string;
   organizeRoutineCriteria:string;
   useAnticipationTools:string;
   addressNeedsViaSchedule:string;
   flexibleRespectfulTiming:string;
   clearCoherentSchedule:string;
   integratesDesignElements:string;
   involveFamilies:string;
   usesVariedTools:string;
   documentsObservations:string;
   flexibleInclusiveDesign:string;
   individualizedSupportiveAssessment:string;
   //Section B
   affectiveEnvironment:string;
   fosterResponsibilityAutonomy:string;
   cozySafeEnjoyable:string;
   positiveAttitudeRoutines:string;
   usePositiveFeedback:string;
   respectfulAffectionateTreatment:string;
   listenToInterests:string;
   addressChildNeeds:string;
   promoteEmpathyConflict:string;
   fosterTeamworkCollaboration:string;
   promoteFreeExpression:string;
   //Section C
   promoteFamilyParticipation:string;
   listenToOpinions:string;
   receptiveToProposals:string;
   facilitateCollaborationActivities:string;
   considerFamilyContext:string;
   communicateProgressMechanisms:string;
   adherenceToComprehensiveCare:string;
   //Section D
   setRealisticGoals:string;
   selfAssessPractice:string;
   peerEvaluateForImprovement:string;
   sharePracticeActivities:string;
   teamConsensusPlanning:string;
   manageVirtualClassroom:string;
   useGoogleProductivity:string;
   useAgeAppropriateResources:string;
   integrateAudiovisualTools:string;
}

export type IAppendix8Input = Appendix8Input & AxiosMessage;
