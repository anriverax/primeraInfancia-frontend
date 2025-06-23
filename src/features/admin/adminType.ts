import { AxiosMessage } from "@/shared/types/globals";

export interface VerifyCodeSchema {
  verifyCode: string;
}

export interface UploadFilesSchema extends AxiosMessage {
  file: File | null;
  images: File[];
  avatar: File | null;
}
export interface ChangePasswdSchema {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type VerifyCodeData = VerifyCodeSchema & AxiosMessage;
export type UploadFilesData = UploadFilesSchema & AxiosMessage;
export type ChangePasswdData = ChangePasswdSchema & AxiosMessage;

export interface ResponseUpdatedPasswd {
  avatar: string;
  isVerified: boolean;
}
