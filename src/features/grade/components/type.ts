import { AxiosMessage } from "@/shared/types/globals";

export interface BulkGradeInput {
  inscriptionId?: number;
  grade: number;
  comment: string;
  moduleProgressStatus: string;
}

export type IBulkGradeInput = BulkGradeInput & AxiosMessage;
