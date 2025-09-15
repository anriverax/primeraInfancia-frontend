import { ITrainingModuleTable } from "../trainingModule/trainingModuleType";

export interface IEvaluationInstrumentTable extends ITrainingModuleTable {
  periodicity: string;
  percentage: number;
}

export type IEvaluationInstrumentColumnKey = "name" | "periodicity" | "percentage";
