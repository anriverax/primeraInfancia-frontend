"use client";

import ConditionalAlert from "@/shared/ui/conditionalAlert";
import { useSignInForm } from "@/components/auth/hook/useSignInForm";
import SignInForm from "@/components/auth/signInForm";

/**
 * Sign-in page with form and error alerts.
 * @returns Rendered sign-in page.
 */
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
        <a href="/recuperar-contrasena" className="text-sm text-primary-600 hover:underline">
          Recuperar contraseña
        </a>
      </nav>
    </div>
  );
};

export default SignInPage;
