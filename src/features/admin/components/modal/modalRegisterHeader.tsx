import { ModalHeader } from "@heroui/react";

type ModalHeaderCustomProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const ModalRegisterHeader = ({
  title,
  description,
  icon
}: ModalHeaderCustomProps): React.JSX.Element => (
  <ModalHeader className="flex flex-col gap-1">
    <div className="flex justify-center mb-2">
      <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
    </div>
    <h2 className="text-xl text-center">{title}</h2>
    <p className="text-center font-normal text-base">{description}</p>
  </ModalHeader>
);

export default ModalRegisterHeader;
