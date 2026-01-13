import { FormikHelpers, useFormik } from "formik";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ISignIn, SignInInput } from "../type";
import { AxiosError } from "axios";
import { signInSchema } from "../utils/signInValidation";
import { FormikProps } from "@/shared/types/globals";
import { encrypt, handleFormikResponseError } from "@/shared/utils/functions";
import { DASHBOARD_REDIRECT_URL } from "@/shared/constants";

const initialValues: SignInInput = {
  email: "",
  passwd: ""
};

const useSignInForm = (): FormikProps<ISignIn> => {
  const router = useRouter();

  const handleSignInResponse = (
    res: SignInResponse | undefined,
    formikHelpers: FormikHelpers<ISignIn>
  ): void => {
    if (res && res.status !== 200) {
      formikHelpers.setFieldError("axiosMessage", res?.error as string);
      formikHelpers.setStatus(res?.status);
    } else router.push("/admin/dashboard/participantes");
  };

  const handleSubmit = async (
    values: SignInInput,
    formikHelpers: FormikHelpers<ISignIn>
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
      handleFormikResponseError<ISignIn>(error as AxiosError, formikHelpers);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: signInSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useSignInForm };
