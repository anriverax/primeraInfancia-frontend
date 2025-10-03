import { useSession } from "next-auth/react";
import { useUpdatedProfileStore } from "../../../shared/hooks/store/useUpdatedProfileStore";
import { useEffect } from "react";
import { Session } from "next-auth";

interface IsFirstFormRenderResult {
  session: Session | null;
}

const useIsFirstFormRender = (): IsFirstFormRenderResult => {
  const { data: session } = useSession();
  const { formStatus, setFormStatus } = useUpdatedProfileStore();

  useEffect(() => {
    if (!session?.user.isVerified) return;
    if (!formStatus.isOk) return;

    setFormStatus({ isOk: false, msg: "" });
  }, [session?.user.isVerified, formStatus.isOk]);

  return { session };
};

export { useIsFirstFormRender };
