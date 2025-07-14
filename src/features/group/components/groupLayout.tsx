import { useGroupModalStore } from "@/shared/hooks/store/useGroupModalStore";
import dynamic from "next/dynamic";

const GroupTable = dynamic(() => import("./table").then((mod) => mod), {
  ssr: false
});

const GroupForm = dynamic(() => import("./groupForm").then((mod) => mod), {
  ssr: false
});

const GroupLayout = (): React.JSX.Element => {
  const { isVisible, toggleVisibility } = useGroupModalStore();

  return (
    <div className="space-y-4">
      <GroupTable onEditGroup={toggleVisibility} />
      {isVisible && <GroupForm />}
    </div>
  );
};

export default GroupLayout;
