import { useMemo } from "react";
import dynamic from "next/dynamic";

const VerifyEmail = dynamic(
  () => import("@/features/admin/components/modal").then((mod) => mod.VerifyEmail),
  {
    ssr: false
  }
);

const UploadFilesModal = dynamic(
  () => import("@/features/admin/components/modal").then((mod) => mod.UploadFilesModal),
  {
    ssr: false
  }
);

const ChangePasswd = dynamic(
  () => import("@/features/admin/components/modal").then((mod) => mod.ChangePasswd),
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
    { id: "verify", element: <VerifyEmail /> },
    { id: "upload", element: <UploadFilesModal /> },
    { id: "change", element: <ChangePasswd /> }
  ];

  const components = useMemo(() => getActiveModals(), []);

  return { components };
};
