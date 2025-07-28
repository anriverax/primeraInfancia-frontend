import { FormikProps } from "@/shared/types/globals";

export interface LeaderInput {
  trainerId: number;
  groupId: number;
}

export interface LeaderFormResult {
  leaderFormik: FormikProps<LeaderInput>;
}

export interface PersonByTypePersonResult {
  id: number;
  fullName: string;
}
