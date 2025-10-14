import { Progress } from "@heroui/react";
import { memo } from "react";

const CustomProgress = memo(
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

CustomProgress.displayName = "MemorizedCustomProgress";
export default CustomProgress;
