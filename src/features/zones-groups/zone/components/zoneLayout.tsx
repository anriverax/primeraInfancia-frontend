import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback } from "react";

const ZoneTable = dynamic(() => import("./table").then((mod) => mod), {
  ssr: false
});

const ZoneForm = dynamic(() => import("./zoneForm").then((mod) => mod), {
  ssr: false
});

const ZoneLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useZoneModalStore();
  const stableToggleVisibility = useCallback(toggleVisibility, [toggleVisibility]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Zonas</h2>
      </div>
      <ZoneTable onEditZone={stableToggleVisibility} />
      {isVisible && typeModal === "Z" && <ZoneForm />}
    </div>
  );
};

export default ZoneLayout;
