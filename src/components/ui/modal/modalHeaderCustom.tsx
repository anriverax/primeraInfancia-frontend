import { DrawerHeader, ModalHeader } from "@heroui/react";
import Image from "next/image";

type ModalHeaderContentProps = {
  title: string;
  imageSrc: string;
  icon: React.ReactNode;
  variant: "modal" | "drawer";
};
export const ModalHeaderContent = ({
  title,
  icon,
  imageSrc,
  variant = "modal"
}: ModalHeaderContentProps): React.JSX.Element => {
  const headerContent = (): React.JSX.Element => (
    <>
      <div className="flex justify-center items-center gap-4 py-8">
        <div className="p-2 bg-white rounded-full">{icon}</div>
        <h3 className="text-center text-white">{title}</h3>
      </div>
      <Image priority src={imageSrc} alt="logo del título" width={105} height={55} />
    </>
  );

  if (variant === "modal") {
    return (
      <ModalHeader className="flex items-center justify-between gap-4 bg-primary-500 rounded-t-lg">
        {headerContent()}
      </ModalHeader>
    );
  }

  return (
    <DrawerHeader className="flex items-center justify-between gap-4 bg-primary-500">
      {headerContent()}
    </DrawerHeader>
  );
};
