import { ModalHeader } from "@heroui/react";
import Image from "next/image";
type ModalHeaderCustomProps = {
  title: string;
  imageSrc: string;
  icon: React.ReactNode;
};

const ModalRegisterHeader = ({ title, imageSrc, icon }: ModalHeaderCustomProps): React.JSX.Element => (
  <ModalHeader>
    <div className="flex justify-center items-center gap-4">
      <div className="p-2 bg-white rounded-full">{icon}</div>
      <h3 className="text-center text-white">{title}</h3>
    </div>
    <Image priority src={imageSrc} alt="logo del título" width={105} height={55} />
  </ModalHeader>
);

export default ModalRegisterHeader;
