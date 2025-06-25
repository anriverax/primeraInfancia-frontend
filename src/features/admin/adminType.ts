import { AxiosMessage } from "@/shared/types/globals";

export interface ICodeVerify {
  verifyCode: string;
}

export interface IUploadFiles {
  file: File | null;
  images: File[];
  avatar: File | null;
}
export interface IPasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type VerifyCodeInput = ICodeVerify & AxiosMessage;
export type UploadFilesInput = IUploadFiles & AxiosMessage;
export type ChangePasswordInput = IPasswordChange & AxiosMessage;

export interface UpdatedPasswordResponse {
  avatar: string;
  isVerified: boolean;
}
