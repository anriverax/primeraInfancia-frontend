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
  nextVisit: string;
}

export type IAppendix3Input = Appendix3Input & AxiosMessage;
