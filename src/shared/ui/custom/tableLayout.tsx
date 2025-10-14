import { ScrollShadow } from "@heroui/react";
import { PropsWithChildren } from "react";

export const TableLayout = ({ children }: PropsWithChildren): React.JSX.Element => (
  <ScrollShadow orientation="horizontal" hideScrollBar={false} className="shadow-small rounded-large">
    <div className="max-w-xs newQuery md:max-w-full lg:max-w-full">{children}</div>
  </ScrollShadow>
);
