import { AxiosMessage, RecordStatus } from "@/shared/types/globals";
import { CalendarDate, CalendarDateTime, DateValue, ZonedDateTime } from "@internationalized/date";

export type AgendaHeaderColumnsKey = "title" | "start" | "trainingModule" | "actions";
export type AgendaTeacherHeaderColumnsKey = "delete" | "fullName" | "phoneNumber" | "email" | "status";
export interface AgendaTableType {
  id: number;
  start: string;
  title: string;
  extendedProps: {
    trainingModule: string;
  };
  color: string;
  isHideButton: boolean;
}

export interface AgendaStepOneInput {
  trainingModuleId: number;
  eventInstanceId: number;
  start: DateValue | null | CalendarDate | CalendarDateTime | ZonedDateTime;
  description?: string;
}

export interface AgendaStepTwoInput {
  plannedEventId: number;
  teacherIds: number[];
}

export type AgendaStepOneResponse = AgendaStepOneInput & AxiosMessage;

export type AgendaStepTwoResponse = AgendaStepTwoInput & AxiosMessage;

export interface PlannedEventType {
  id: number;
  module: {
    id: number;
    name: string;
  };
  eventInstance: {
    id: number;
    name: string;
  };
  limitCount: number;
  description: string | null;
  start: string;
  teachers: number[];
}

interface ITeacherListWithSchool {
  id: number;
  fullName: string;
  School: {
    code: string;
    name: string;
  };
}

export interface ITeacherListWithSchoolV2 extends ITeacherListWithSchool {
  plannedEventTeacherId: number;
  personId: number;
  phoneNumber: string | null;
  email: string | undefined;
  status: RecordStatus;
}
export interface PlannedEventTeachers extends Omit<PlannedEventType, "teachers"> {
  teachers: ITeacherListWithSchoolV2[];
}
