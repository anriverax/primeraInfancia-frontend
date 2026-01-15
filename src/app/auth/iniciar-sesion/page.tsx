"use client";

import ConditionalAlert from "@/shared/ui/custom/conditionalAlert";
import { useSignInForm } from "@/components/auth/hook/useSignInForm";
import SignInForm from "@/components/auth/signInForm";

const SignInPage = (): React.JSX.Element => {
  const formik = useSignInForm();

  const hasErrors = Object.keys(formik.errors).length > 0;
  const showAlert = formik.status === 401 && hasErrors;

  return (
    <div className="mx-auto">
      {showAlert && (
        <ConditionalAlert status={formik.status} errors={formik.errors} setStatus={formik.setStatus} />
      )}
      <SignInForm formik={formik} />
      <nav className="flex flex-col space-y-3 md:items-center justify-center mt-8 lg:flex-row lg:space-y-0">
        <a href="/recuperar-contrasena" className="text-sm text-blue-500 hover:underline">
          Recuperar contraseña
        </a>
      </nav>
    </div>
  );
};

export default SignInPage;
