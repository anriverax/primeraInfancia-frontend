import { Popup } from "react-map-gl/mapbox";
import { PopupData } from "../dashboard.type";
import { Dispatch, SetStateAction } from "react";
interface DashBoardPopoverProps {
  popup: PopupData;
  setPopup: Dispatch<SetStateAction<PopupData | null>>;
}

const PopupCustom = ({ popup, setPopup }: DashBoardPopoverProps): React.JSX.Element => (
  <Popup
    key={`${popup.lng}-${popup.lat}-${popup.name}`}
    longitude={popup.lng}
    latitude={popup.lat}
    anchor="bottom"
    onClose={() => setPopup(null)}
  >
    <p className="text-[12px] font-bold">{popup.name}</p>
    <div className="border-b border-neutral-300 mb-4"></div>
    <p>Código: {popup.code}</p>
    <p>Zona: {popup.zone}</p>
    <p>Distrito: {popup.districtName}</p>
    <p>Municipio: {popup.municipalityName}</p>
    <p>Departamento: {popup.departmentName}</p>
    <p className="mb-4">Región: {popup.region}</p>

    <p>Total docentes: {popup.teachersCount}</p>
  </Popup>
);

export default PopupCustom;
