import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface PrincipalSchoolInput {
  id?: number | null;
  name: string;
}

export interface IPrincipalSchoolTable extends PrincipalSchoolInput {
}

export type IPrincipalSchool = PrincipalSchoolInput & AxiosMessage;

export type IPrincipalSchoolColumnKey = "name" | "count" | "actions";
export interface PrincipalSchoolListResult {
  PrincipalSchoolsList: IPrincipalSchoolTable[];
  setPrincipalSchoolsList: (_PrincipalSchools: IPrincipalSchoolTable[]) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PrincipalSchoolTableProps extends Pick<PrincipalSchoolListResult, "PrincipalSchoolsList"> {
}

export interface PrincipalSchoolFormResult {
  principalSchoolFormik: FormikProps<IPrincipalSchool>;
  reset: () => void;
  data: PrincipalSchoolInput | null;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
