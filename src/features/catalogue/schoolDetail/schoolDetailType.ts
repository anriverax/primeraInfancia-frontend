import { ISchoolTable } from "../school/schoolType";

export interface ISchoolDetail extends Omit<ISchoolTable, "_count" | "ubication"> {
  zone: string;
  sector: string;
  District: {
    id: number;
    name: string;
    Municipality: {
      id: number;
      name: string;
      Department: {
        id: number;
        name: string;
      };
    };
  };
}
