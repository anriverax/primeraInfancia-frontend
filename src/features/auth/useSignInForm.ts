import { FormikHelpers, useFormik } from "formik";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SingInData } from "./type";
import { AxiosError } from "axios";
import { signInValidation } from "./signInValidation";
import { FormikProps } from "@/shared/types/globals";
import { encrypt, formResponseError } from "@/shared/utils/funtions";
import { DASHBOARD_REDIRECT_URL } from "@/shared/constants";

const initialValues: SingInData = {
  email: "",
  passwd: ""
};

const useSignInForm = (): FormikProps<SingInData> => {
  const router = useRouter();

  const handleSignInResponse = (
    res: SignInResponse | undefined,
    formikHelpers: FormikHelpers<SingInData>
  ): void => {
    if (res && res.status !== 200) {
      formikHelpers.setFieldError("axiosMessage", res?.error as string);
      formikHelpers.setStatus(res?.status);
    } else router.push("/admin/dashboard");
  };

  const handleSubmit = async (
    values: SingInData,
    formikHelpers: FormikHelpers<SingInData>
  ): Promise<void> => {
    const encryptedEmail = encrypt(values.email);
    const encryptedPassword = encrypt(values.passwd);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: encryptedEmail,
        password: encryptedPassword,
        callbackUrl: `${process.env.NEXT_PUBLIC_URL || ""}${DASHBOARD_REDIRECT_URL}`
      });

      handleSignInResponse(res, formikHelpers);
    } catch (error) {
      // Handle login error.
      const { setStatus, setFieldError } = formikHelpers;

      formResponseError(error as AxiosError, setStatus, setFieldError);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: signInValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useSignInForm };
