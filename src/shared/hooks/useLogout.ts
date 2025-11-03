import { AxiosResponse } from "axios";
import useAxios from "./useAxios";
import { signOut } from "next-auth/react";
import { handleAxiosError } from "../utils/functions";
import { useTechnicianModeStore } from "./store/useTechnicianModeStore";
import { useAppStateStore } from "./store/useAppStateStore";

const useLogout = (): {
  handleSignOut: () => Promise<void>;
} => {
  const useRequest = useAxios(true);
  const resetTechnicianMode = useTechnicianModeStore.getState().reset;
  const setSigningOut = useAppStateStore.getState().setSigningOut;

  const handleSignOut = async (): Promise<void> => {
    try {
      setSigningOut(true);
      const avatarResponse: AxiosResponse<void> = await useRequest.post("/auth/logout");

      if (avatarResponse.status === 201 && avatarResponse.data) {
        // Clear persisted technician mode before signing out
        resetTechnicianMode();
        signOut({
          redirect: true,
          // Use relative path to let NextAuth resolve against NEXTAUTH_URL in prod
          callbackUrl: "/auth/iniciar-sesion"
        });
      }
    } catch (error) {
      handleAxiosError(error, "Error al cerrar sesión", "obtener");
      setSigningOut(false);
    }
  };

  return { handleSignOut };
};

export { useLogout };
