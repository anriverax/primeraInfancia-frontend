import { AxiosMessage } from "@/shared/types/globals";

export interface IVerifyCode {
  verifyCode: string;
}

export interface IUploadFiles {
  file: File | null;
  images: File[];
  avatar: File | null;
}
export interface IChangePasswd {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type VerifyCodeInput = IVerifyCode & AxiosMessage;
export type UploadFilesInput = IUploadFiles & AxiosMessage;
export type ChangePasswdInput = IChangePasswd & AxiosMessage;

export interface UpdatedPasswdResponse {
  avatar: string;
  isVerified: boolean;
}
