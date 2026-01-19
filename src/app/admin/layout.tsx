"use client";

import Logo from "@/shared/ui/logo";
import Sidebar from "@/shared/ui/custom/sidebar";
import FormModal from "../../features/admin/components/modal/modalForms";
import TopBar from "@/shared/ui/custom/topbar";

import WithProtectedRoute from "../withProtectedRoute";
import { useIsFirstFormRender } from "@/features/admin/hooks/useIsFirstFormRender";
import { useTechnicianMode } from "@/shared/store/useTechnicianModeStore";
import { TypeRole } from "@/shared/constants";
import TechnicianModeModal from "@/features/admin/components/modal/technicianModeModal";
import { useIsSigningOut } from "@/shared/store/useAppStateStore";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AuthLayoutProps): React.JSX.Element {
  const { session } = useIsFirstFormRender();
  const mode = useTechnicianMode();
  const isSigningOut = useIsSigningOut();

  const isTech = session?.user.role === TypeRole.USER_TECNICO_APOYO;

  return (
    <div className="relative flex h-full w-full bg-white">
      <Sidebar logo={<Logo />} />
      <div className="relative flex h-full flex-1 flex-col ">
        <TopBar />

        <div className="px-5 relative py-12 md:px-8">{children}</div>
        {session && !session?.user.isVerified && <FormModal isOpen={true} />}
        {isTech && !mode && !isSigningOut && <TechnicianModeModal isOpen={true} />}
      </div>
    </div>
  );
}

export default WithProtectedRoute(AdminLayout);
