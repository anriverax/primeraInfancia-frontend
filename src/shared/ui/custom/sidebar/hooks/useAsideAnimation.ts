import { cn } from "@/shared/utils/tv";
import { useCallback } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const useAsideAnimation = (isExtended: boolean): any => {
  const getAsideAnimation = useCallback(
    (isMobile: boolean) => {
      if (isMobile) {
        return {
          initial: { x: "-100%" },
          animate: { x: isExtended ? 0 : "-100%" },
          transition: { duration: 0.3, ease: "easeInOut" },
          exit: { x: "-100%" },
          className: "fixed bg-white border-r border-gray-200 min-h-screen top-0 left-0 w-64 z-40"
        };
      }

      return {
        initial: false,
        animate: { width: isExtended ? 256 : 72 },
        transition: { duration: 0.3, ease: "easeInOut" },
        className: cn(
          "relative bg-white border-r border-gray-200 min-h-screen top-0 left-0 z-10 space-y-5",
          {
            "w-64": isExtended,
            "w-[72px]": !isExtended
          }
        )
      };
    },
    [isExtended]
  );

  return { getAsideAnimation };
};
/* eslint-enaable @typescript-eslint/no-explicit-any */

export { useAsideAnimation };
