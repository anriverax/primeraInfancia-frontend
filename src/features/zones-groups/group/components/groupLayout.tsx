import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import GroupForm from "./groupForm";
import GroupTable from "./table";
import { useGroupsList } from "../../hooks/group/useGroupsList";

const GroupLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useZoneModalStore();
  const { groupList, deleteGroup } = useGroupsList();

  return (
    <>
      <GroupTable groupList={groupList} deleteGroup={deleteGroup} onEditGroup={toggleVisibility} />
      {isVisible && typeModal === "G" && <GroupForm />}
    </>
  );
};

export default GroupLayout;
