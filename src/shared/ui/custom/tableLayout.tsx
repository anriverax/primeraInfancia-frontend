import { PropsWithChildren } from "react";

export const TableLayout = ({ children }: PropsWithChildren): React.JSX.Element => (
  <div className="newQuery md:max-w-full">{children}</div>
);
