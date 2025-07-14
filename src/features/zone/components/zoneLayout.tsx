import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const ZoneTable = dynamic(() => import("./table").then((mod) => mod), {
  ssr: false
});

const ZoneLayout = (): React.JSX.Element => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <MapPin className="h-5 w-5 text-blue-500" />
      <h2 className="text-lg font-semibold text-gray-900">Zonas</h2>
    </div>
    <ZoneTable />
  </div>
);

export default ZoneLayout;
