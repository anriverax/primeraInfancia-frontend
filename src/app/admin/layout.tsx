"use client";

import Logo from "@/shared/ui/logo";
import Sidebar from "@/shared/ui/sidebar";
import FormModal from "../../features/admin/components/modal/modalForms";
import TopBar from "@/shared/ui/topbar";

import WithProtectedRoute from "../withProtectedRoute";
import { useIsFirstFormRender } from "@/features/admin/hooks/useIsFirstFormRender";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AuthLayoutProps): React.JSX.Element {
  const { session } = useIsFirstFormRender();

  return (
    <div className="relative flex h-dvh w-full bg-gray-50">
      <Sidebar logo={<Logo />} />
      <div className="relative flex h-full flex-1 flex-col ">
        <TopBar />

        <div className="gap-6 p-12 bg-gray-50">{children}</div>
        {session && !session?.user.isVerified && <FormModal isOpen={true} />}
      </div>
    </div>
  );
}

export default WithProtectedRoute(AdminLayout);
