export interface ILearningPathTable {
  id: number;
  name: string;
  periodicity: string;
  percentage: number;
  code: string;
}

export type ILearningPathColumnKey = "name" | "periodicity" | "percentage" | "code";
