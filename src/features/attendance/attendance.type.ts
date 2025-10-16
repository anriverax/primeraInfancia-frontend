import { AxiosMessage } from "@/shared/types/globals";

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
  checkIn: string;
  checkOut: string | null;
  Event: {
    name: string;
  };
  id: number;
  status: string;
  _count: {
    PrincipalSchool: number;
  };
}
