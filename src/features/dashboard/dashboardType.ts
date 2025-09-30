export interface IGroupCount {
  label: string;
  count: number;
}
export interface IEventType {
  totalEvents: number;
  name: string;
  Event: {
    name: string;
  }[];
}

export interface ITeacherStatus {
  inactive: number;
  active: number;
}

export interface IAttendanceFiltersResponse {
  eventType: IGroupCount[];
  mentoring: IGroupCount[];
  events: IEventType[];
}
export interface ISchoolsFiltersResponse {
  zone: IGroupCount[];
  department: { department: string; school: number; teacher: number }[];
  career: IGroupCount[];
  ages: IGroupCount[];
  sex: IGroupCount[];
  nip: number;
  experience: IGroupCount[];
  educationalLevel: IGroupCount[];
  totalTeacher: ITeacherStatus;
}

export type ICareerColumnKey = "label" | "count";

export interface IMentoringFiltersResponse {
  appendix8: IAppendix8[];
}

export interface IAppendix8 {
  dimension: string;
  answers: {
    time: number;
    labels: IGroupCount[];
  }[];
}
