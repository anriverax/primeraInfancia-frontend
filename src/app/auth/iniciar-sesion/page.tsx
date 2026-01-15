"use client";

import { useMemo, memo } from "react";
import ConditionalAlert from "@/shared/ui/custom/conditionalAlert";
import { useSignInForm } from "@/components/auth/hook/useSignInForm";
import SignInForm from "@/components/auth/signInForm";

// ✅ Memoize OUTSIDE component to prevent recreation on each render
// This prevents input elements from being unmounted/remounted on every parent render
const MemoizedSignInForm = memo(SignInForm);

const SignInPage = (): React.JSX.Element => {
  // ✅ Call hook directly - no need for useMemo
  // useSignInForm internally handles memoization with useCallback and useFormik
  // The formik instance is stable across renders due to Formik's internal state management
  const formik = useSignInForm();
  const { status, errors, setStatus } = formik;

  // Memoized error check to avoid recalculation
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  return (
    <div className="mx-auto">
      {hasErrors && status === 401 && (
        <ConditionalAlert status={status} errors={errors} setStatus={setStatus} />
      )}
      <MemoizedSignInForm formik={formik} />
      <nav className="flex flex-col space-y-3 md:items-center justify-center mt-8 lg:flex-row lg:space-y-0">
        <a href="/recuperar-contrasena" className="text-sm text-blue-500 hover:underline">
          Recuperar contraseña
        </a>
      </nav>
    </div>
  );
};

export default SignInPage;
