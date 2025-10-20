import { ITrainingModuleTable } from "../catalogue/trainingModule/trainingModuleType";

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
  trainingModule: Pick<ITrainingModuleTable, "id" | "name">[];

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

export interface CategoryAppendix {
  label: string;
  count: number;
}

export interface IDashboardResume {
  teacherFemale: number;
  teacherMale: number;
  teacherShiftAm: number;
  teacherShiftPm: number;
  earlyEducation: CategoryAppendix[];
  extraEducation: CategoryAppendix[];
}
