import { Progress } from "@heroui/react";
import { memo } from "react";

const ProgressCustom = memo(
  (): React.JSX.Element => (
    <div className="flex justify-center items-center h-dvh">
      <Progress
        isIndeterminate
        aria-label="Cargando..."
        className="max-w-md"
        color="primary"
        size="sm"
        label="Cargando..."
      />
    </div>
  )
);

ProgressCustom.displayName = "MemorizedProgressCustom";
export default ProgressCustom;
