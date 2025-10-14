import { ScrollShadow } from "@heroui/react";
import { PropsWithChildren } from "react";

export const TableLayout = ({ children }: PropsWithChildren): React.JSX.Element => (
  <div className="max-w-xs newQuery md:max-w-full lg:max-w-full">
    <ScrollShadow orientation="horizontal" hideScrollBar={false} className="shadow-small rounded-large">
      {children}
    </ScrollShadow>
  </div>
);
