"use client";

import Logo from "@/shared/ui/logo";
import Sidebar from "@/shared/ui/sidebar";
import FormModal from "../../features/admin/components/modal/modalForms";
import TopBar from "@/shared/ui/topbar";

import WithProtectedRoute from "../withProtectedRoute";
import { useIsFirstFormRender } from "@/features/admin/hooks/useIsFirstFormRender";
import { useTechnicianModeStore } from "@/shared/hooks/store/useTechnicianModeStore";
import { TypeRole } from "@/shared/constants";
import TechnicianModeModal from "@/features/admin/components/modal/technicianModeModal";
import { useAppStateStore } from "@/shared/hooks/store/useAppStateStore";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AuthLayoutProps): React.JSX.Element {
  const { session } = useIsFirstFormRender();
  const mode = useTechnicianModeStore((s) => s.mode);
  const isSigningOut = useAppStateStore((s) => s.isSigningOut);

  const isTech = session?.user.role === TypeRole.USER_TECNICO_APOYO;

  return (
    <div className="relative flex h-dvh w-full bg-gray-50">
      <Sidebar logo={<Logo />} />
      <div className="relative flex h-full flex-1 flex-col ">
        <TopBar />

        <div className="px-5 relative py-12 md:px-8 bg-gray-50">{children}</div>
        {session && !session?.user.isVerified && <FormModal isOpen={true} />}
        {isTech && !mode && !isSigningOut && <TechnicianModeModal isOpen={true} />}
      </div>
    </div>
  );
}

export default WithProtectedRoute(AdminLayout);
