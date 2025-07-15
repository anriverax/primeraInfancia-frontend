import { PropsWithChildren } from "react";

type GModalHeaderProps = {
  title: string;
  description?: string;
};

export const ModalHeaderCustom = ({
  title,
  children,
  description
}: PropsWithChildren<GModalHeaderProps>): React.JSX.Element => (
  <div className="bg-gradient-to-r rounded-t-large from-blue-600 to-blue-700 p-4 text-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {children}
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
    </div>
    <p className="text-blue-100 text-sm mt-1">{description}</p>
  </div>
);
