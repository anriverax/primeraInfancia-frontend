"use client";

import { Checkbox } from "@heroui/react";

import ConditionalAlert from "@/shared/ui/custom/conditionalAlert";
import { useSignInForm } from "@/features/auth/useSignInForm";
import { SignInForm } from "./_partials";

const SignInPage = (): React.JSX.Element => {
  const formik = useSignInForm();

  const { status, errors, setStatus } = formik;

  return (
    <div className="mx-auto">
      {Object.keys(errors).length > 0 && status === 401 && (
        <ConditionalAlert status={status} errors={errors} setStatus={setStatus} />
      )}
      <SignInForm formik={formik} />
      <div className="flex flex-col space-y-3 md:items-center justify-between mt-8 lg:flex-row lg:space-y-0">
        <div className="flex  items-center space-x-2">
          <Checkbox id="remember" />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Recordar contraseña
          </label>
        </div>

        <a href="#" className="text-sm text-blue-500 hover:underline">
          Contraseña olvidada?
        </a>
      </div>
    </div>
  );
};
export default SignInPage;
