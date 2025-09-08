import { AxiosResponse } from "axios";
import useAxios from "./useAxios";
import { signOut } from "next-auth/react";
import { handleAxiosError } from "../utils/funtions";

const useLogout = (): {
  handleSignOut: () => Promise<void>;
} => {
  const useRequest = useAxios(true);

  const handleSignOut = async (): Promise<void> => {
    try {
      const avatarResponse: AxiosResponse<void> = await useRequest.post("/auth/logout");

      if (avatarResponse.status === 201 && avatarResponse.data) {
        signOut({
          redirect: true,
          callbackUrl: `${process.env.NEXT_PUBLIC_URL}/auth/iniciar-sesion`
        });
      }
    } catch (error) {
      handleAxiosError(error, "Error al cerrar sesión", "obtener");
    }
  };

  return { handleSignOut };
};

export { useLogout };
