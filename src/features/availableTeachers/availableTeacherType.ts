import { IPagination, IPerson } from "@/shared/types/globals";
import { Dispatch, SetStateAction } from "react";

export interface ISchool {
  id: number;
  name: string;
  coordenates: string;
  address: string;
}
export interface AvailableTeacherResult extends IPerson {
  address: string;
  User: {
    email: string;
  };
  school: ISchool[];
}

export interface AvailableTeacherResultWithPagination {
  handleChangePage: Dispatch<SetStateAction<number>>;

  availableTeacherList: AvailableTeacherResult[];
  meta: IPagination | undefined;
}
