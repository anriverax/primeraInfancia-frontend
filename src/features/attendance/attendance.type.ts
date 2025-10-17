import { AxiosMessage, IPagination } from "@/shared/types/globals";
import { Dispatch, SetStateAction } from "react";

export interface AttendanceInput {
  eventId: number;
  coordenates?: string;
  modality: string;
  teacherId: number[];
  comment?: string;
  justificationUrl?: string;
  status?: string;
}
export interface IAttendanceCreated {
  id: number;
  coordenates: string;
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
export interface TeachersAssignmentWithEvents {
  events: IEvent[];
  teachers: TeachersAssignmentMentor[];
}

export interface ILastAttendance {
  id: number;
  event: string;
  modality: string;
  checkIn: string;
  details: {
    fullName: string;
    coordenates: string;
  }[];
}

export interface IAttendanceTable {
  personRoleId: number;
  fullName: string;
  totalEvent: number;
}

export interface AttendanceListResult {
  handleChangePage: Dispatch<SetStateAction<number>>;
  attendanceList: IAttendanceTable[];
  meta: IPagination | undefined;
}

export type IAttendanceColumnKey = "fullName" | "totalEvents" | "actions";
