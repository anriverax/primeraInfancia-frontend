import { handleAxiosError } from "../../utils/functions";
import { useTechnicianModeStore } from "../../store/useTechnicianModeStore";
import { useAppStateStore } from "../../store/useAppStateStore";
import useSignOut from "@/components/auth/hook/useSignOut";

const useLogout = (): {
  handleSignOut: () => Promise<void>;
} => {
  const resetTechnicianMode = useTechnicianModeStore.getState().reset;
  const setSigningOut = useAppStateStore.getState().setSigningOut;
  const { signOutWithCredentials } = useSignOut();

  const handleSignOut = async (): Promise<void> => {
    try {
      setSigningOut(true);

      resetTechnicianMode();

      await signOutWithCredentials();
    } catch (error) {
      handleAxiosError(error, "Error al cerrar sesión", "obtener");
      setSigningOut(false);
    }
  };

  return { handleSignOut };
};

export { useLogout };
