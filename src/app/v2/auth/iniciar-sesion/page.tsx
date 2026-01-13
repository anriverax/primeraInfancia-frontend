"use client";

import { Checkbox } from "@heroui/react";
import SignInForm from "@/features/auth/components/signInForm";
import ConditionalAlert from "@/shared/ui/custom/conditionalAlert";
import { useSignInForm } from "@/components/auth/hook/useSignInForm";

const SignInPage = (): React.JSX.Element => {
  const formik = useSignInForm();

  const { status, errors, setStatus } = formik;

  return (
    <div className="mx-auto">
      {Object.keys(errors).length > 0 && status === 401 && (
        <ConditionalAlert status={status} errors={errors} setStatus={setStatus} />
      )}
      <SignInForm formik={formik} />
      <div className="flex flex-col space-y-3 md:items-center justify-center mt-8 lg:flex-row lg:space-y-0">
        <a href="#" className="text-sm text-blue-500 hover:underline">
          Contraseña olvidada?
        </a>
      </div>
    </div>
  );
};
export default SignInPage;
