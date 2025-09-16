import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment1Input {
  applicationDate: string;
  schoolName: string;
  departmentMunicipality: string;
  teacherName: string;
  mentorName: string;
  startDate: string;
  finishDate: string;
  frequencyOfEncounters: string;
  teacherSignature: string;
  mentorSignature: string;
}

export type IAttachment1Input = Attachment1Input & AxiosMessage;
