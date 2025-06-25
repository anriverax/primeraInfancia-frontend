import { useZoneModalStore } from "@/shared/hooks/store/useZoneModalStore";
import { useZonesList } from "../../hooks/useZonesList";

import ZoneTable from "./table";
import ZoneForm from "./zoneForm";

const ZoneLayout = (): React.JSX.Element => {
  const { isVisible, typeModal } = useZoneModalStore();
  const { zonesList, setZonesList, deleteZone } = useZonesList();

  return (
    <>
      <ZoneTable zonesList={zonesList} deleteZone={deleteZone} />
      {isVisible && typeModal === "Z" && <ZoneForm setZonesList={setZonesList} />}
    </>
  );
};

export default ZoneLayout;
