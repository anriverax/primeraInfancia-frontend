"use client";

import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";

type RenderOverlayProps = {
  isMobile: boolean;
  isExtended: boolean;
  onClose: () => void;
};

const SidebarOverlay = memo(
  ({ isMobile, isExtended, onClose }: RenderOverlayProps): React.JSX.Element => (
    <AnimatePresence>
      {isMobile && isExtended && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-black z-40 lg:hidden"
          onClick={onClose}
        />
      )}
    </AnimatePresence>
  )
);

SidebarOverlay.displayName = "MemorizedSidebarOverlay";

export { SidebarOverlay };
