export interface ITrainingModuleTable {
  id: number;
  name: string;
  title: string;
  startDate: Date;
  endDate: Date;
  hours: number;
}

export type ITrainingModuleColumnKey = "name" | "title" | "startDate" | "endDate" | "hours";
