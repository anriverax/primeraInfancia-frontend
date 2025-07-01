import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import { useZonesList } from "../../hooks/useZonesList";

import ZoneTable from "./table";
import ZoneForm from "./zoneForm";

const ZoneLayout = (): React.JSX.Element => {
  const { isVisible, typeModal, toggleVisibility } = useZoneModalStore();
  const { zonesList, onDeleteZone } = useZonesList();

  return (
    <>
      <ZoneTable zonesList={zonesList} onDeleteZone={onDeleteZone} onEditZone={toggleVisibility} />
      {isVisible && typeModal === "Z" && <ZoneForm />}
    </>
  );
};

export default ZoneLayout;
