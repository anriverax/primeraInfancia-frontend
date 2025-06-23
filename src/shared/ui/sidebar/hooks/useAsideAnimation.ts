import { cn } from "@/shared/utils/tv";
import { useCallback } from "react";

interface AnimationProps {
  initial:
    | {
        x: string;
      }
    | boolean;
  animate:
    | {
        x: string | number;
      }
    | {
        width?: undefined | number;
      };
  transition: {
    duration: number;
    ease: string;
  };
  exit?: {
    x: string;
  };
  className: string;
}

interface UseAsideAnimationResponse {
  getAsideAnimation: (_isMobile: boolean) => AnimationProps | void;
}

const useAsideAnimation = (isExtended: boolean): UseAsideAnimationResponse => {
  const getAsideAnimation = useCallback(
    (isMobile: boolean) => {
      if (isMobile) {
        return {
          initial: { x: "-100%" },
          animate: { x: isExtended ? 0 : "-100%" },
          transition: { duration: 0.3, ease: "easeInOut" },
          exit: { x: "-100%" },
          className: "fixed bg-white top-0 left-0 w-64 h-dvh z-40 border-gray-200 border-r"
        };
      }

      return {
        initial: false,
        animate: { width: isExtended ? 256 : 72 },
        transition: { duration: 0.3, ease: "easeInOut" },
        className: cn("relative bg-white top-0 left-0 h-dvh z-10 space-y-5 border-gray-200 border-r", {
          "w-64": isExtended,
          "w-[72px]": !isExtended
        })
      };
    },
    [isExtended]
  );

  return { getAsideAnimation };
};

export { useAsideAnimation };
