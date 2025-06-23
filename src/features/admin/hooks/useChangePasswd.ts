import { ChangePasswdData, ResponseUpdatedPasswd } from "../adminType";
import { FormikHelpers, useFormik } from "formik";
import { changePasswdValidation } from "../modalValidation";
import { encrypt, formResponseError } from "@/shared/utils/funtions";
import { AxiosError, AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { useUpdatedProfileStore } from "./store/useUpdatedProfileStore";
import { FetchResponse, FormikProps } from "@/shared/types/globals";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { LOGIN_REDIRECT_URL } from "@/shared/constants";

const initialValuesPasswd: ChangePasswdData = {
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: ""
};

const useChangePasswd = (): FormikProps<ChangePasswdData> => {
  const useRequest = useAxios(true);
  const { formStatus, setFormStatus } = useUpdatedProfileStore();

  const handleSubmit = async (
    values: ChangePasswdData,
    formikHelpers: FormikHelpers<ChangePasswdData>
  ): Promise<void> => {
    const encryptedCurrentPassword = encrypt(values.currentPassword);
    const encryptedNewPassword = encrypt(values.newPassword);

    try {
      const response: AxiosResponse<FetchResponse<ResponseUpdatedPasswd>> = await useRequest.post(
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
      const { setStatus, setFieldError } = formikHelpers;
      formResponseError(error as AxiosError, setStatus, setFieldError);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesPasswd,
    validationSchema: changePasswdValidation,
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

export { useChangePasswd };
