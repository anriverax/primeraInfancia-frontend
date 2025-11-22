import { AxiosMessage } from "@/shared/types/globals";

/* ---------------------------
 * New, improved data model
 * ---------------------------
 * These types reduce duplicación, facilitan renderizado/validación
 * y expresan claramente que hay 3 actividades por dimensión.
 */

export interface Activity {
  activity: string;
  resource: string;
  timing: string;
  successIndicator: string;
}

export interface DimensionPlan {
  dimension: string;
  subDimension: string;
  goal: string;
  levelOfAchievement: string;
  /** 1 a 3 actividades según UI dinámica. */
  activities: Activity[];
}

/**
 * Preferred Appendix 3 shape going forward. Allows ≥ 1 dimensiones.
 */
export interface Appendix3Input {
  dimensions: [DimensionPlan, ...DimensionPlan[]];
  otherStrategies?: string;
  strategies?: string[];
  descriptionAgreements: string;
  nextVisit: Date | null;
}

export type IAppendix3Input = Appendix3Input & AxiosMessage;

export interface DimensionPlanSchema extends Omit<DimensionPlan, "activities"> {
  activities: Activity[];
}

export interface Appendix3Schema extends Omit<Appendix3Input, "dimensions"> {
  dimensions: DimensionPlanSchema[];
}
