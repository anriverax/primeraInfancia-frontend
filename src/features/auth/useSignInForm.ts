import { FormikHelpers, useFormik } from "formik";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SingInInput } from "./type";
import { AxiosError } from "axios";
import { signInSchema } from "./signInValidation";
import { FormikProps } from "@/shared/types/globals";
import { encrypt, formResponseError } from "@/shared/utils/funtions";
import { DASHBOARD_REDIRECT_URL } from "@/shared/constants";

const initialValues: SingInInput = {
  email: "",
  passwd: ""
};

const useSignInForm = (): FormikProps<SingInInput> => {
  const router = useRouter();

  const handleSignInResponse = (
    res: SignInResponse | undefined,
    formikHelpers: FormikHelpers<SingInInput>
  ): void => {
    if (res && res.status !== 200) {
      formikHelpers.setFieldError("axiosMessage", res?.error as string);
      formikHelpers.setStatus(res?.status);
    } else router.push("/admin/dashboard");
  };

  const handleSubmit = async (
    values: SingInInput,
    formikHelpers: FormikHelpers<SingInInput>
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
    validationSchema: signInSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return formik;
};

export { useSignInForm };
