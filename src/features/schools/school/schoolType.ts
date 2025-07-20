import { AxiosMessage, FormikProps } from "@/shared/types/globals";
import { DistrictInput } from "../district/districtType";

export interface SchoolInput {
  id?: number | null;
  name: string;
  sector?: string;
  districtId: number;
  address: string;
  email: string;
  coordenates: string;
  phoneNumber: string;
}

export interface PersonInput {
  id?: number | null;
  firstName: string;
  lastName1?: string;
  lastName2: number;
  dui: string;
  phoneNumber: string;
  email: string;
}

export interface ISchoolTable extends SchoolInput {
  District?: DistrictInput;
  PrincipalSchool?: [
    Person?: {
      firstName: string;
      lastName1: string;
      lastName2: string;
      email: string;
      phoneNumber: string;
    }]
}

export interface ISchoolDetailTable extends PersonInput {
  District?: DistrictInput;
  PrincipalSchool?: [
    Person?: {
      firstName: string;
      lastName1: string;
      lastName2: string;
      email: string;
      phoneNumber: string;
    }]
  _count?: {
    Group: number;
  };
}

export interface IPersonSchoolDetailTable extends SchoolInput {
  District?: DistrictInput;
  PrincipalSchool?: [
    Person?: {
      firstName: string;
      lastName1: string;
      lastName2: string;
      email: string;
      phoneNumber: string;
    }];
  TypePerson?: {
    name: string
  }
}

export interface ISchoolCoordenate {
  parseCoordinates: [number, number];
}

export type ISchool = SchoolInput & AxiosMessage;

export type ISchoolColumnKey = "name" | "district" | "email" | "phoneNumber" | "actions";
export type ISchoolDetailColumnKey = "TypePerson" | "firstName" | "lastName1" | "lastName2" | "dui" | "phoneNumber" | "Person" | "email";
export type IPersonSchoolDetailColumnKey = "firstName" | "lastName1" | "lastName2" | "dui" | "phoneNumber";

export interface SchoolListResult {
  schoolsList: ISchoolTable[];
  setSchoolsList: (_schools: ISchoolTable[]) => void;
}

export interface SchoolDetailListResult {
  schoolsDetailsList: ISchoolDetailTable[];
  setSchoolsDetailsList: (_schools: ISchoolDetailTable[]) => void;
}

export interface SchoolPersonDetailListResult {
  schoolPersonDetail: IPersonSchoolDetailTable[];
  setSchoolDetail: (_schools: ISchoolDetailTable[]) => void;
}

export interface SchoolCoordenateResult {
  schoolCoordenate: ISchoolCoordenate[];
  setSchoolsDetailsList: (_schools: ISchoolCoordenate[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SchoolTableProps extends Pick<SchoolListResult, "schoolsList" > {
}

export interface SchoolDetailTableProps extends Pick<SchoolDetailListResult, "schoolsDetailsList"> {
}

export interface SchoolPersonDetailTableProps extends Pick<SchoolDetailListResult, "schoolsDetailsList"> {
}

export interface SchoolModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface SchoolFormResult {
  schoolFormik: FormikProps<ISchool>;
  reset: () => void;
  data: SchoolInput | null;
}

export interface SchoolModalAction extends SchoolModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
