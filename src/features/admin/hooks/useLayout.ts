import { useSession } from "next-auth/react";
import { useUpdatedProfileStore } from "./store/useUpdatedProfileStore";
import { TopBarProps } from "@/shared/types/globals";
import { TypeRole } from "@/shared/constants";
import { useEffect } from "react";
import { Session } from "next-auth";

interface useLayoutResponse {
  session: Session | null;
  getUserData: () => TopBarProps;
}

const useLayout = (): useLayoutResponse => {
  const { data: session } = useSession();
  const { formStatus, setFormStatus } = useUpdatedProfileStore();

  const getUserData = (): TopBarProps => {
    if (session) {
      const { name, email, role, picture } = session!.user;
      return {
        name,
        email,
        role: role as TypeRole,
        avatar: picture
      };
    }
    return { name: "", email: "", role: "" as TypeRole, avatar: "" };
  };

  useEffect(() => {
    if (session?.user.isVerified && formStatus.isOk) {
      setFormStatus({
        isOk: false,
        msg: ""
      });
    }
  }, [session?.user.isVerified, formStatus.isOk, setFormStatus]);

  return { session, getUserData };
};

export { useLayout };
