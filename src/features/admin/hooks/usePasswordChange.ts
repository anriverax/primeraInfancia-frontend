import { FormikHelpers, useFormik } from "formik";
import { changePasswordSchema } from "../modalValidation";
import { encrypt, handleFormikResponseError, showToast } from "@/shared/utils/functions";
import { AxiosError, AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/http/useAxios";
import {
  useProfileFormIsOk,
  useUpdatedProfileStore
} from "../../../shared/store/useUpdatedProfileStore";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { LOGIN_REDIRECT_URL } from "@/shared/constants";
import { ChangePasswordInput, IPasswordChange, UpdatedPasswordResponse } from "../adminType";

const initialPasswordValues: ChangePasswordInput = {
  email: "",
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: ""
};

const usePasswordChange = (): FormikProps<IPasswordChange> => {
  const useRequest = useAxios(true);
  const { setFormStatus } = useUpdatedProfileStore.getState();
  const isOk = useProfileFormIsOk();

  const handleSubmit = async (
    values: ChangePasswordInput,
    formikHelpers: FormikHelpers<IPasswordChange>
  ): Promise<void> => {
    const encryptedEmail = encrypt(values.email);
    const encryptedCurrentPassword = encrypt(values.currentPassword);
    const encryptedNewPassword = encrypt(values.newPassword);

    try {
      const response: AxiosResponse<FetchResponse<UpdatedPasswordResponse>> = await useRequest.post(
        "/auth/change-password",
        {
          value1: encryptedEmail,
          value2: encryptedCurrentPassword,
          value3: encryptedNewPassword
        }
      );

      const { data } = response;

      if (data.statusCode === 200) {
        setFormStatus({ isOk: true, msg: data.message as string });
      } else {
        showToast(String(data.message), "danger");
      }
    } catch (error) {
      // Handle login error.
      handleFormikResponseError<IPasswordChange>(error as AxiosError, formikHelpers);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialPasswordValues,
    validationSchema: changePasswordSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  useEffect(() => {
    if (isOk) signOut({ callbackUrl: LOGIN_REDIRECT_URL });
  }, [isOk]);

  return formik;
};

export { usePasswordChange };
