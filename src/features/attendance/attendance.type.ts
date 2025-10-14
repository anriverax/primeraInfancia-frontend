import { AttendanceEnum } from "@/shared/constants";
import { AxiosMessage } from "@/shared/types/globals";

export interface IAttendanceTable {
  id?: number;
  Event: {
    name: string;
  };
  checkIn: string;
  checkOut: string;
  status: AttendanceEnum;
}

export interface AttendanceInput {
  eventId: number;
  coordenates?: string;
  modality: string;
  teacherId: number[];
  comment?: string;
  justificationUrl?: string;
  status?: string;
}
export type IAttendanceCreated = Pick<IAttendanceDetail, "id" | "coordenates">;
export type IAttendance = AttendanceInput & AxiosMessage;

export interface IAttendanceDetail {
  id: number;
  checkIn: string;
  coordenates: string;
  checkOut: string;
  Event: Pick<IEvent, "name">;
}

export interface IMentorAssignmentBox {
  id: number;
  fullName: string;
}

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

export interface IMentorAssignmentSchool {
  code: number;
  name: string;
  coordenates: string;
  location: string;
}

export interface IMentorAssignmentData extends IMentorAssignmentBox {
  School: IMentorAssignmentSchool;
}

export interface IMentorAssignmentByUser {
  selectBox: IMentorAssignmentBox[];
  teachers: IMentorAssignmentData[];
}
