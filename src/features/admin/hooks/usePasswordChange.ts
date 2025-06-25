import { FormikHelpers, useFormik } from "formik";
import { changePasswordSchema } from "../modalValidation";
import { encrypt, handleFormikResponseError } from "@/shared/utils/funtions";
import { AxiosError, AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { useUpdatedProfileStore } from "../../../shared/hooks/store/useUpdatedProfileStore";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { LOGIN_REDIRECT_URL } from "@/shared/constants";
import { ChangePasswordInput, UpdatedPasswordResponse } from "../adminType";

const initialPasswordValues: ChangePasswordInput = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: ""
};

const usePasswordChange = (): FormikProps<ChangePasswordInput> => {
  const useRequest = useAxios(true);
  const { formStatus, setFormStatus } = useUpdatedProfileStore();

  const handleSubmit = async (
    values: ChangePasswordInput,
    formikHelpers: FormikHelpers<ChangePasswordInput>
  ): Promise<void> => {
    const encryptedCurrentPassword = encrypt(values.currentPassword);
    const encryptedNewPassword = encrypt(values.newPassword);

    try {
      const response: AxiosResponse<FetchResponse<UpdatedPasswordResponse>> = await useRequest.post(
        "/auth/change-password",
        {
          value1: encryptedCurrentPassword,
          value2: encryptedNewPassword
        }
      );

      const result = response.data;

      if (result.data) setFormStatus({ isOk: true, msg: result.message as string });
    } catch (error) {
      // Handle login error.
      handleFormikResponseError<ChangePasswordInput>(error as AxiosError, formikHelpers);
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
    if (formStatus.isOk)
      signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL || ""}${LOGIN_REDIRECT_URL}` });
  }, [formStatus]);

  return formik;
};

export { usePasswordChange };
