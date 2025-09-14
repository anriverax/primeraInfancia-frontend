import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface TrainingModuleInput {
  id?: null;
  moduleName: string;
}

export interface ITrainingModuleTable extends TrainingModuleInput {
  _count?: {
    Group: number;
  };
}
export type ITrainingModule = TrainingModuleInput & AxiosMessage;

export type ITrainingModuleColumnKey = "moduleName" | "createdBy";
export interface TrainingModuleListResult {
  trainingModulesList: ITrainingModuleTable[];
  setTrainingModulesList: (_trainingModules: ITrainingModuleTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface TrainingModuleTableProps
  extends Pick<TrainingModuleListResult, "trainingModulesList"> {}
/* eslint-enable @typescript-eslint/no-empty-object-type */

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrainingModuleModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface TrainingModuleFormResult {
  trainingModuleFormik: FormikProps<ITrainingModule>;
  reset: () => void;
  data: TrainingModuleInput | null;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TrainingModuleModalAction extends TrainingModuleModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
