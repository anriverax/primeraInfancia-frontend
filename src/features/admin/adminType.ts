import { AxiosMessage } from "@/shared/types/globals";

export interface VerifyCodeInput {
  verifyCode: string;
}

export interface UploadFilesInput {
  file: File | null;
  images: File[];
  avatar: File | null;
}
export interface ChangePasswordInput {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type IVerifyCode = VerifyCodeInput & AxiosMessage;
export type IUploadFiles = UploadFilesInput & AxiosMessage;
export type IPasswordChange = ChangePasswordInput & AxiosMessage;

export interface UpdatedPasswordResponse {
  avatar: string;
  isVerified: boolean;
}
