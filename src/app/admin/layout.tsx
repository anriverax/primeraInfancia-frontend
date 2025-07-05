"use client";

import { Logo } from "@/shared/ui/logo";
import Sidebar from "@/shared/ui/sidebar";
import FormModal from "../../features/admin/components/modal/modalForms";
import TopBar from "@/shared/ui/topbar";
import { useLayout } from "@/features/admin/hooks/useLayout";
import WithProtectedRoute from "../withProtectedRoute";
import { useMenuItemsStore } from "@/shared/hooks/store/useMenuItemsStore";
import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { FetchResponse } from "@/shared/types/globals";
import { IMenuPermission } from "@/shared/types/next-auth";
import useAxios from "@/shared/hooks/useAxios";
import { handleAxiosError } from "@/shared/utils/funtions";

type AuthLayoutProps = {
  children: React.ReactNode;
};

function AdminLayout({ children }: AuthLayoutProps): React.JSX.Element {
  const { session, getUserData } = useLayout();
  const { menuItems, setMenuItems } = useMenuItemsStore();
  const useRequest = useAxios(true);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res: AxiosResponse<FetchResponse<IMenuPermission[]>> =
          await useRequest.get("/catalogue/menuItems");
        console.log(res);
        const { data } = res.data;

        setMenuItems(data);
      } catch (error) {
        handleAxiosError(error, "listado de personas", "obtener");
      }
    };
    console.log(menuItems);
    if (menuItems.length === 0 && session) {
      fetchData();
    }
  }, [session]);
  /* eslint-enable react-hooks/exhaustive-deps */
  return (
    <div className="relative flex h-dvh w-full bg-gray-50">
      <Sidebar logo={<Logo />} />
      <div className="relative flex h-full flex-1 flex-col ">
        <TopBar {...getUserData()} />

        <div className="flex flex-1 flex-col gap-6 p-12 bg-gray-50">{children}</div>
        {session && !session?.user.isVerified && <FormModal />}
      </div>
    </div>
  );
}

export default WithProtectedRoute(AdminLayout);
