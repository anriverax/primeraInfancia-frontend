"use client";

import { Easing, motion } from "framer-motion";
import { Dispatch, SetStateAction, useCallback } from "react";
import { PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { cn } from "@/shared/utils/tv";

type ToggleButtonProps = {
  isExtended: boolean;
  isMobile: boolean;
  setExtended: Dispatch<SetStateAction<boolean>>;
};

const ToggleButton = ({ isExtended, isMobile, setExtended }: ToggleButtonProps): React.JSX.Element => {
  /* eslint-disable react-hooks/exhaustive-deps */
  const handleClick = useCallback(() => {
    setExtended((prev) => !prev);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const getToggleButtonAnimation: {
    transition: {
      duration: number;
      ease: Easing | Easing[] | undefined;
    };
    className: string;
  } = {
    transition: { duration: 0.5, ease: [0.2, 0, 0, 1] },
    className: "flex justify-center cursor-pointer"
  };

  const renderIcon = (): React.JSX.Element => {
    if (isMobile) {
      if (isExtended) return <X className="text-gray-50" />;
      return <PanelLeftOpen className="text-gray-600" />;
    }

    if (isExtended) return <PanelLeftClose className="text-gray-600" />;

    return <PanelLeftOpen className="text-gray-600" />;
  };

  return (
    <button
      className={cn(
        "outline-none px-4 absolute flex items-center rounded-r-full justify-center w-7 h-7 top-[15px]",
        isMobile && !isExtended ? "-right-15" : "-right-11"
      )}
      onClick={handleClick}
    >
      <motion.span {...getToggleButtonAnimation}>{renderIcon()}</motion.span>
    </button>
  );
};

export default ToggleButton;
