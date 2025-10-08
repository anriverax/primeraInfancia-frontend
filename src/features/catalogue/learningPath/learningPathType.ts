export interface ILearningPathTable {
  id: number;
  name: string;
  periodicity: string;
  percentage: number;
}

export type ILearningPathColumnKey = "name" | "periodicity" | "percentage";
