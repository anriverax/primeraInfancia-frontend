import { ScrollShadow } from "@heroui/react";
import { PropsWithChildren } from "react";

export const TableLayout = ({ children }: PropsWithChildren): React.JSX.Element => (
  <div className="shadow-small rounded-large">
    <ScrollShadow
      orientation="horizontal"
      hideScrollBar={false}
      className="shadow-small rounded-large max-w-full"
    >
      <div className="max-w-xs newQuery md:max-w-full lg:max-w-full">{children}</div>
    </ScrollShadow>
  </div>
);
