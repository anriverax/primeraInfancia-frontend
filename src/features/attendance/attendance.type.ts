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
}

export type IAttendance = AttendanceInput & AxiosMessage;

export interface IAttendanceDetail {
  id: number;
  checkIn: string;
  coordenates: string;
  checkOut: string;
  Event: Pick<IEvent, "name">;
}
