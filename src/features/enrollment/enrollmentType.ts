import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface EnrollmentInput {
  id?:  | null;
  teacherId: number;
  groupId: number;
  mentorId: number;
  administrativeStatus: number;
}

export interface IEnrollmentTable extends EnrollmentInput {
  _count?: {
    Group: number;
  };
}
export type IEnrollment = EnrollmentInput & AxiosMessage;

export type IEnrollmentColumnKey = "teacherId" | "groupId" | "mentorId" | "administrativeStatus" | "createdBy" ;
export interface EnrollmentListResult {
  enrollmentsList: IEnrollmentTable[];
  setEnrollmentsList: (_Enrollments: IEnrollmentTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EnrollmentTableProps extends Pick<EnrollmentListResult, "enrollmentsList" > {
}

export interface EnrollmentModalInput {
  isVisible: boolean;
  typeModal: "Z" | "G";
  data?: any | null;
}

export interface EnrollmentFormResult {
  enrollmentFormik: FormikProps<IEnrollment>;
  reset: () => void;
  data: EnrollmentInput | null;
}

export interface EnrollmentModalAction extends EnrollmentModalInput {
  toggleVisibility: (_form: "Z" | "G", _data?: any | null) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
