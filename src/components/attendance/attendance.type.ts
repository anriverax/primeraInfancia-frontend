import { AxiosMessage, IPagination } from "@/shared/types/globals";
import { Dispatch, SetStateAction } from "react";

export interface AttendanceInput {
  isResponsible: string;
  eventInstanceId: number;
  modality: string;
  supportId: number;
  coordenates?: string;
  teacherId: number[];
  status: string;
  comment?: string;
  justificationUrl?: string;
}

export type IAttendance = AttendanceInput & AxiosMessage;

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
