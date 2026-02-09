import { Tab, Tabs } from "@heroui/react";
import { Dispatch, SetStateAction, memo } from "react";

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

type TabsCustomProps = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  setSelectedTab: Dispatch<SetStateAction<any>>;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  selectedTab: string;
  tabs: TabItem[];
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const TabsCustom = memo(
  ({ setSelectedTab, selectedTab, tabs }: TabsCustomProps): React.JSX.Element => (
    <Tabs
      aria-label="Tabs variants"
      variant="light"
      items={tabs}
      selectedKey={selectedTab}
      classNames={{
        cursor: "bg-transparent shadow-none",
        tab: "rounded-lg data-[selected=true]:bg-primary-500 data-[hover-unselected=true]:opacity-none data-[hover=true]:opacity-100",
        tabContent: "px-[0.5rem] py-[1rem] group-data-[selected=true]:text-white text-primary-500"
      }}
      onSelectionChange={(key) => setSelectedTab(key as any)}
    >
      {(item: TabItem) => (
        <Tab
          key={item.id}
          title={
            <div className="flex items-center space-x-2">
              {item.icon}
              <span>{item.label}</span>
            </div>
          }
        />
      )}
    </Tabs>
  )
);
/* eslint-enable @typescript-eslint/no-explicit-any */
TabsCustom.displayName = "TabsCustom";

export default TabsCustom;
