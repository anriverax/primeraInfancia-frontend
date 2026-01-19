import { memo } from "react";

const DividerCustom = memo(
  (): React.JSX.Element => (
    <div data-orientation="vertical" role="none" className="shrink-0 bg-gray-300 w-[1px] mr-4 h-4"></div>
  )
);

DividerCustom.displayName = "MemorizedDividerCustom";

export { DividerCustom };
