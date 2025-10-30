import { AxiosMessage } from "@/shared/types/globals";

export interface Appendix3Input {
  dimension: string;
  subDimension: string;
  goal: string;
  activities: string;
  resources: string;
  timing: string;

  successIndicator: string;
  levelOfAchievement: string;
   otherStrategys?: string;
  
  // array of selected strategies (optional)
  strategies?: string[];

  // classroomObservation: string;
  // dialoguedFeedback: string;
  // pedagogicalModeling: string;
  // coPlanning: string
  // portfolioReview: string;
  // teachingMaterial: string;
  // others: string;
  
  //nextVisit: string;
}

export type IAppendix3Input = Appendix3Input & AxiosMessage;
