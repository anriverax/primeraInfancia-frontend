import { AxiosMessage } from "@/shared/types/globals";

export interface DimesionDetail {
  dimension: string;
  subdimension: string;
  goal: string;
  activities: string;
  resources: string;
  tempo: string;
  successIndicators: string;
  levelAchievement: string;
}

export interface Appendix3Input {
  ask1: DimesionDetail[];
  ask2: string[];
  ask3: string;
  questionMap?: any;
}

export type IAppendix3Input = Appendix3Input & AxiosMessage;
