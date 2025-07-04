"use client";

import { sidebarItems } from "@/shared/utils/sidebarItems";
import { Logo } from "@/shared/ui/logo";
import Sidebar from "@/shared/ui/sidebar";
import FormModal from "../../features/admin/components/modal/modalForms";
import TopBar from "@/shared/ui/topbar";
import { useLayout } from "@/features/admin/hooks/useLayout";
import WithProtectedRoute from "../withProtectedRoute";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AuthLayoutProps): React.JSX.Element {
  const { session, getUserData } = useLayout();

  return (
    <div className="relative flex h-dvh w-full bg-gray-50">
      <Sidebar items={session?.permissions || []} logo={<Logo />} />
      <div className="relative flex h-full flex-1 flex-col ">
        <TopBar {...getUserData()} />

        <div className="flex flex-1 flex-col gap-6 p-12 bg-gray-50">{children}</div>
        {session && !session?.user.isVerified && <FormModal />}
      </div>
    </div>
  );
}

export default WithProtectedRoute(AdminLayout);
