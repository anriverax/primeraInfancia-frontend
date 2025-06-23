"use client";

import { motion } from "framer-motion";
import { memo, useCallback, useState } from "react";
import { SidebarItemType } from "./type";
import { useAsideAnimation } from "./hooks/useAsideAnimation";
import ToggleButton from "./partials/toggleButton";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { SidebarOverlay } from "./partials/sidebarOverlay";
import { SidebarNavigation } from "./partials/siderbarNavegation";

type SidebarProps = {
  logo: React.ReactNode;
  items: SidebarItemType[];
};

const Sidebar = memo(({ logo, items }: SidebarProps): React.JSX.Element => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Determine if the sidebar is extended based on the screen size
  // If isMobile is undefined, default to false (desktop view)
  const [isExtended, setExtended] = useState<boolean>(
    typeof isMobile !== "undefined" ? (isMobile ? true : true) : true
  );

  const { getAsideAnimation } = useAsideAnimation(isExtended);

  const handleToggleSidebar = useCallback(() => {
    setExtended(false);
  }, [setExtended]);

  return (
    <>
      <SidebarOverlay isMobile={isMobile} isExtended={isExtended} onClose={handleToggleSidebar} />

      {typeof isMobile !== "undefined" && (
        <motion.aside {...getAsideAnimation(isMobile)}>
          <div className="flex justify-center gap-2 p-4 border-b bg-white border-gray-200">{logo}</div>
          <ToggleButton isExtended={isExtended} setExtended={setExtended} isMobile={isMobile} />
          {items && <SidebarNavigation items={items} isMobile={isMobile} isExtended={isExtended} />}
        </motion.aside>
      )}
    </>
  );
});

Sidebar.displayName = "MemorizedSidebar";

export default Sidebar;
