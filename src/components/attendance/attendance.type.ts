import { AxiosMessage, IPagination } from "@/shared/types/globals";
import { Dispatch, SetStateAction } from "react";

export type AttendanceHeaderColumnsKey = "event" | "modality" | "checkIn" | "checkOut" | "actions";

export interface AttendanceTableType {
  id: number;
  event: string;
  checkIn: Date;
  checkOut: Date | null;
  modality: string;
  coordenates: string | null;
  support: {
    id: number;
    fullName: string;
  };
  responsible: {
    id: number;
    fullName: string;
  };
}

export interface AttStepOneInput {
  isResponsible: string;
  eventInstanceId: number;
  modality: string;
  supportId: number;
}
export interface AttStepTwoInput extends AttStepOneInput {
  coordenates?: string;
  teacherId: number[];
  status: string;
  comment?: string;
  justificationUrl?: string;
  classificationId?: number;
}

export type AttStepTwoResponse = AttStepTwoInput & AxiosMessage;

export interface TeachersAssignmentMentor {
  id: number;
  fullName: string;
  School: {
    code: number;
    name: string;
    coordenates: string;
    location: string;
  };
}

export interface IEvent {
  id: number;
  name: string;
}

export interface IAttendanceTable {
  personRoleId: number;
  fullName: string;
  totalEvent: number;
}

export interface AttendanceListResult {
  handleChangePage: Dispatch<SetStateAction<number>>;
  attendanceList: EventList[];
  meta: IPagination | undefined;
}

export type IAttendanceColumnKey = "fullName" | "totalEvents" | "actions";

export interface EventList {
  id: number;
  name: string;
}

export interface SupportList {
  id: number;
  fullName: string;
}

export interface LastAttendance {
  id: number;
  coordenates: string | null;
  checkIn: Date;
  modality: string;
  eventInstance: {
    id: number;
    name: string;
    responsible: string;
  };
  support: SupportList;
  teacherSession: {
    id: number;
    checkIn: Date;
    status: "PRESENTE" | "AUSENTE";
    teacher: SupportList;
  }[];
}
