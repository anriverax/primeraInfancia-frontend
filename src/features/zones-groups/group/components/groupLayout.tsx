import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import { Users } from "lucide-react";
import dynamic from "next/dynamic";

const GroupTable = dynamic(() => import("./table").then((mod) => mod), {
  ssr: false
});

const GroupForm = dynamic(() => import("./groupForm").then((mod) => mod), {
  ssr: false
});

const GroupLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useZoneModalStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        <h2 className="text-lg font-semibold text-gray-900">Grupos</h2>
      </div>
      <GroupTable onEditGroup={toggleVisibility} />
      {isVisible && typeModal === "G" && <GroupForm />}
    </div>
  );
};

export default GroupLayout;
