import { ScrollShadow } from "@heroui/react";
import { PropsWithChildren } from "react";

export const TableLayout = ({ children }: PropsWithChildren): React.JSX.Element => (
  <div className="p-4 z-0 shadow-small rounded-large w-full">
    <ScrollShadow orientation="horizontal" hideScrollBar={false}>
      <div className="max-w-sm md:max-w-md lg:max-w-full">{children}</div>
    </ScrollShadow>
  </div>
);
