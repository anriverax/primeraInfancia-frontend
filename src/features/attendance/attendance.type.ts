import { AxiosMessage } from "@/shared/types/globals";

export interface IEvent {
  id: number;
  name: string;
}

export interface EventSelectBoxResult {
  eventList: IEvent[];
  attendance: IAttendanceDetail;
}

export interface AttendanceInput {
  eventId: number;
  coordenates?: string;
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
