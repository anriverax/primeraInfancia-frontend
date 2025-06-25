import { useSession } from "next-auth/react";
import { useUpdatedProfileStore } from "../../../shared/hooks/store/useUpdatedProfileStore";
import { TopBarProps } from "@/shared/types/globals";
import { TypeRole } from "@/shared/constants";
import { useEffect } from "react";
import { Session } from "next-auth";

interface LayoutResponse {
  session: Session | null;
  getUserData: () => TopBarProps;
}

const useLayout = (): LayoutResponse => {
  const { data: session } = useSession();
  const { formStatus, setFormStatus } = useUpdatedProfileStore();

  const getUserData = (): TopBarProps => {
    if (session?.user) {
      const { name, email, role, picture } = session.user;
      return {
        name,
        email,
        role: role as TypeRole,
        avatar: picture
      };
    }
    return { name: "", email: "", role: "" as TypeRole, avatar: "" };
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!session?.user.isVerified) return;
    if (!formStatus.isOk) return;

    setFormStatus({ isOk: false, msg: "" });
  }, [session?.user.isVerified, formStatus.isOk]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { session, getUserData };
};

export { useLayout };
