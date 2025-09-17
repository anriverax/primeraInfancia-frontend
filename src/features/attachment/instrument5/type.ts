import { AxiosMessage } from "@/shared/types/globals";

export interface Attachment5Input {
  mentorObserve: string;
  challengeClassroom: string;
  emotionalManagment: string;
  whatImprove: string;
  practiceHighlights: string;
  emotionalBond:string;
  identifiedPotentials: string;
  dilemmansObserved: string;
  questionsDidWeAsk: string;
  lessonsEmerged: string;
  improvementNextSession: string;
  changesTeachingStaff: string;
  evidenceObserved: string;
  mentorRecommendations: string;
}

export type IAttachment5Input = Attachment5Input & AxiosMessage;
