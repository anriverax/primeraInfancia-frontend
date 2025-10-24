import { IVerifyCode, VerifyCodeInput } from "../adminType";
import { FormikHelpers, useFormik } from "formik";
import { verifyCodeSchema } from "../modalValidation";
import { AxiosError, AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { FormikProps } from "@/shared/types/globals";
import { handleFormikResponseError } from "@/shared/utils/functions";
import { useModalFormVisibleStore } from '@/shared/hooks/store/useModalFormVisibleStore';

const initialCodeValues: VerifyCodeInput = {
  verifyCode: ""
};

const useCodeVerify = (): FormikProps<IVerifyCode> => {
  const useRequest = useAxios(true);
  const { setFormVisible } = useModalFormVisibleStore();

  const handleSubmit = async (
    values: VerifyCodeInput,
    formikHelpers: FormikHelpers<IVerifyCode>
  ): Promise<void> => {
    try {
      const avatarResponse: AxiosResponse<boolean> = await useRequest.post("/auth/verify-email", values);

      if (avatarResponse.data) setFormVisible(1);
    } catch (error) {
      handleFormikResponseError<IVerifyCode>(error as AxiosError, formikHelpers);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialCodeValues,
    validationSchema: verifyCodeSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useCodeVerify };
