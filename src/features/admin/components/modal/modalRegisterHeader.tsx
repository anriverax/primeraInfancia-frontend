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
  <ModalHeader className="flex flex-col gap-1 bg-primary-500 rounded-t-xl">
    <div className="flex justify-center mb-2">
      <div className="p-2 bg-white rounded-full">{icon}</div>
    </div>
    <h3 className="text-center text-white">{title}</h3>
    <p className="text-center font-normal text-[13px]">{description}</p>
  </ModalHeader>
);

export default ModalRegisterHeader;
