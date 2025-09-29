import { AxiosMessage } from "@/shared/types/globals";

export interface BulkGradeInput {
  inscriptionId?: number;
  grade: number;
  comment: string;
  moduleProgressStatus: string;
}

export type IBulkGradeInput = BulkGradeInput & AxiosMessage;

export interface EvaluationInstrument {
  id: number;
  moduleName: string;
}
export interface TrainingModule {
  id: number;
  instrumentName: string;
}
export interface ModuleEvaluation {
  id: number;
  grade: number;
  comment: string;
  EvaluationInstrument?: EvaluationInstrument;
  TrainingModule?: TrainingModule;
}
export interface TrainingEvaluation {
  id: number;
  grade: number;
  comment: string;
  EvaluationInstrument?: EvaluationInstrument;
}
export interface Inscription {
  id: number;
  ModuleEvaluation?: ModuleEvaluation;
  TrainingEvaluation?: TrainingEvaluation;
}

export interface GroupInscriptionInput {
  id: number;
  Inscripttion?: Inscription;
}

export interface IGroupInscriptionTable extends GroupInscriptionInput {
  _count?: {
    Group: number;
  };
}

export interface GroupInscriptionResult {
  groupInscriptionList: IGroupInscriptionTable[];
  setGroupInscriptionsList: (_groupInscriptions: IGroupInscriptionTable[]) => void;
}
