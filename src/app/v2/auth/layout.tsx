"use client";

import { useEffect } from "react";
import { addToast } from "@heroui/react";
import { useUpdatedProfileStore } from "@/shared/hooks/store/useUpdatedProfileStore";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps): React.JSX.Element => {
  const { formStatus } = useUpdatedProfileStore();

  useEffect(() => {
    if (formStatus.isOk)
      addToast({
        title: formStatus.msg,
        severity: "success",
        variant: "bordered",
        classNames: {
          icon: "w-6 h-6 fill-current text-green-500"
        }
      });
  }, [formStatus]);

  return (
    <div>
      <div className="min-h-dvh w-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-100">
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-1 sm:mb-3">
            Bienvenidos
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl">Formación Primera Infancia</h2>
        </div>

        <div className="d bg-white max-w-md w-full p-8 rounded-3xl shadow-lg">
          <div className="flex items-center justify-center md:mb-12">
            <h2 className="text-2xl font-semibold text-blue-800 mb-3">Iniciar sesión</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
