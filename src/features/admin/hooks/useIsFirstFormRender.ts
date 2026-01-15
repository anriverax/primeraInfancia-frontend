import { useSession } from "next-auth/react";
import {
  useProfileFormIsOk,
  useUpdatedProfileStore
} from "../../../shared/store/useUpdatedProfileStore";
import { useEffect } from "react";
import { Session } from "next-auth";

interface IsFirstFormRenderResult {
  session: Session | null;
}

const useIsFirstFormRender = (): IsFirstFormRenderResult => {
  const { data: session } = useSession();
  const isOk = useProfileFormIsOk();
  const { setFormStatus } = useUpdatedProfileStore.getState();

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (!session?.user.isVerified) return;
    if (!isOk) return;

    setFormStatus({ isOk: false, msg: "" });
  }, [session?.user.isVerified, isOk]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return { session };
};

export { useIsFirstFormRender };
