"use client";

import { useEffect } from "react";

import { addToast } from "@heroui/react";
import { useUpdatedProfileStore } from "@/shared/hooks/store/useUpdatedProfileStore";
import IllustratedAuthPortal from "@/features/auth/components/illustratedLoginDashboard";

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
    <div className="bg-gradient-to-b from-blue-400 to-blue-600 min-h-dvh w-full flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-white max-w-5xl w-full flex justify-center rounded-lg shadow-xl">
        {/* Left side - Blue section */}
        <IllustratedAuthPortal />
        {/* Right side - White section */}
        <div className="p-8 w-full md:w-1/2">
          <div className="flex items-center justify-center md:mb-12">
            <h2 className="text-2xl  font-semibold text-blue-600 mb-6">Inicio de sesión</h2>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
