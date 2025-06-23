import { AnimatePresence, motion } from "framer-motion";
import { SubMenuItem } from "../../type";
import { memo } from "react";
import SubmenuLink from "./submenuLink";

type SubmenuItemProps = { isSubmenuOpen: boolean; submenu: SubMenuItem[] | undefined; pathname: string };

const SubmenuItem = memo(
  ({ isSubmenuOpen, submenu, pathname }: SubmenuItemProps): React.JSX.Element => (
    <AnimatePresence>
      {isSubmenuOpen && submenu && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden border-l-2 border-blue-200 bg-gray-50"
        >
          <div className="pl-5 pr-2 py-1 space-y-1">
            {submenu.map((item: SubMenuItem) => {
              const isActive = pathname === item.path;

              return (
                <SubmenuLink
                  key={item.path}
                  item={item}
                  isActive={isActive}
                  isSubmenuOpen={isSubmenuOpen}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
);

SubmenuItem.displayName = "MemorizedSubmenuItem";
export default SubmenuItem;
