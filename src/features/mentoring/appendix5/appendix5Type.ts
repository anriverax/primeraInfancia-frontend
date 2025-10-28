import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix5Input {
  teacherFocusArea: string;
  recentDifficulties: string;
  improvementGoals: string;
  practiceHighlights: string;
  emotionalConnection: string;
  emotionalAwareness: string;
  identifiedStrengths: string;
  dimlemasTensions: string;
  keyLearning: string;
  commitmentNextSession: string;
  changesSinceLast: string
  observedEvidence: string;
  recomendation: string;
  othersNotes: string;
}

export type IAppendix5Input = Appendix5Input & AxiosMessage;
