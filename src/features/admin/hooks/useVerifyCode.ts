import { VerifyCodeInput } from "../adminType";
import { FormikHelpers, useFormik } from "formik";
import { verifyCodeSchema } from "../modalValidation";
import { useActiveFormStore } from "@/shared/hooks/store/useActiveFormStore";
import { AxiosError, AxiosResponse } from "axios";
import useAxios from "@/shared/hooks/useAxios";
import { formResponseError } from "@/shared/utils/funtions";
import { FormikProps } from "@/shared/types/globals";

const initialValuesCode: VerifyCodeInput = {
  verifyCode: ""
};

const useVerifyCode = (): FormikProps<VerifyCodeInput> => {
  const useRequest = useAxios(true);
  const { setShowForm } = useActiveFormStore();

  const handleSubmit = async (
    values: VerifyCodeInput,
    formikHelpers: FormikHelpers<VerifyCodeInput>
  ): Promise<void> => {
    try {
      const avatarResponse: AxiosResponse<boolean> = await useRequest.post("/auth/verify-email", values);

      if (avatarResponse.data) setShowForm(1);
    } catch (error) {
      // Handle login error.
      const { setStatus, setFieldError } = formikHelpers;

      formResponseError(error as AxiosError, setStatus, setFieldError);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValuesCode,
    validationSchema: verifyCodeSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useVerifyCode };
