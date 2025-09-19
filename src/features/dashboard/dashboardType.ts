export interface ISchoolsFiltersResponse {
  zone: { name: string; count: number }[];
  department: { department: string; school: number; teacher: number }[];
  career: ICareerTable[];
  ages: { range: string; quantity: number }[];
  sex: { sex: string; count: number }[];
  nip: number;
  total: {
    school: number;
    teacher: number;
  };
}

export type ICareerColumnKey = "career" | "count";

export interface ICareerTable {
  career: string;
  count: number;
}
