import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import GroupForm from "./groupForm";

const GroupLayout = (): React.JSX.Element => {
  const { isVisible, typeModal } = useZoneModalStore();

  return <>{isVisible && typeModal === "G" && <GroupForm />}</>;
};

export default GroupLayout;
