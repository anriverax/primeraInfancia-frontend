import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import GroupForm from "./groupForm";
import GroupTable from "./table";
import { useGroupsList } from "../../hooks/useGroupsList";

const GroupLayout = (): React.JSX.Element => {
  const { isVisible, typeModal } = useZoneModalStore();
  const { groupList, deleteGroup } = useGroupsList();

  return (
    <>
      <GroupTable groupList={groupList} deleteGroup={deleteGroup} />
      {isVisible && typeModal === "G" && <GroupForm />}
    </>
  );
};

export default GroupLayout;
