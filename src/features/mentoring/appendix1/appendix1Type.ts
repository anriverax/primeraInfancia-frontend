/**
 * Types for Appendix 1 (Mentoring Agreement).
 * Defines the shape of the form data and the extended backend response type.
 */
import { AxiosMessage } from "@/shared/types/globals";

/**
 * Values captured in Appendix 1.
 *
 * - estimatedClosingDate: estimated end date of the mentoring process.
 * - estimatedFrequencyMeetings: estimated meeting frequency (free text, e.g., "weekly").
 */
export interface Appendix1Input {
  estimatedClosingDate: Date;
  estimatedFrequencyMeetings: string;
}

/**
 * Extended response type for Appendix 1 operations.
 * Includes common Axios message fields (status, message, etc.).
 */
export type IAppendix1Input = Appendix1Input & AxiosMessage;
