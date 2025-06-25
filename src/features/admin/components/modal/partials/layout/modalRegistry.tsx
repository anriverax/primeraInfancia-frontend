import { useMemo } from "react";
import dynamic from "next/dynamic";

const EmailVerify = dynamic(
  () => import("@/features/admin/components/modal/partials/emailVerify").then((mod) => mod),
  {
    ssr: false
  }
);

const UploadFilesModal = dynamic(
  () => import("@/features/admin/components/modal/partials/uploadFilesModal").then((mod) => mod),
  {
    ssr: false
  }
);

const PasswordChange = dynamic(
  () => import("@/features/admin/components/modal/partials/passwordChange").then((mod) => mod),
  {
    ssr: false
  }
);

export interface IModalComponent {
  id: string;
  element: React.JSX.Element;
}

interface ModalRegistryResponse {
  components: IModalComponent[];
}

export const useModalRegistry = (): ModalRegistryResponse => {
  const getActiveModals = (): IModalComponent[] => [
    { id: "verify", element: <EmailVerify /> },
    { id: "upload", element: <UploadFilesModal /> },
    { id: "change", element: <PasswordChange /> }
  ];

  const components = useMemo(() => getActiveModals(), []);

  return { components };
};
