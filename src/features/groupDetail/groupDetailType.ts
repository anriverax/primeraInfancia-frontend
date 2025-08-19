import { AxiosMessage, FormikProps } from "@/shared/types/globals";

export interface LeaderInput {
  trainerId: number;
  groupId: number;
}

export type ILeader = LeaderInput & AxiosMessage;

export interface LeaderFormResult {
  leaderFormik: FormikProps<LeaderInput>;
}

export interface PersonByTypePersonResult {
  id: number;
  Person: {
    id: number;
    fullName: string;
  };
}

export interface ParticipantInput {
  groupId: number;
  typePersonId: number;
  zoneId: number;
  memberCount: number;
}
