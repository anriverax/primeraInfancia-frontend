"use client";

import Map, { NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useState } from "react";
import { Popup } from "react-map-gl/mapbox";
import MapBoxDepartment from "@/components/modules/dashboard/mapBox/mapBoxDepartment";
import { PopupData, SchoolList } from "@/components/modules/dashboard/dashboard.type";
import MapBoxSchool from "@/components/modules/dashboard/mapBox/mapBoxSchool";
import PopupCustom from "@/components/modules/dashboard/mapBox/popupCustom";
import { useMouseMoveInteraction } from "@/components/modules/dashboard/mapBox/hook/useMouseMoveInteraction";
import { useClickInteraction } from "@/components/modules/dashboard/mapBox/hook/useClickInteraction";

type MapbofilteredxRealProps = {
  filtered: SchoolList[];
  setSelectedDepto: React.Dispatch<React.SetStateAction<string | null>>;
};

const MapboxReal = ({ filtered, setSelectedDepto }: MapbofilteredxRealProps): React.JSX.Element => {
  const [popup, setPopup] = useState<PopupData | null>(null);
  /* eslint-disable react-hooks/exhaustive-deps */
  const memoizedSetPopup = useCallback(setPopup, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  const [viewState, setViewState] = useState({
    longitude: -88.9,
    latitude: 13.7,
    zoom: 7.8
  });

  const { onClick, selectedSchoolId } = useClickInteraction(setSelectedDepto, setPopup);
  const { onMouseMove, tooltip } = useMouseMoveInteraction();

  return (
    <div className="w-full h-full">
      <Map
        {...viewState}
        initialViewState={{
          longitude: -88.9,
          latitude: 13.7,
          zoom: 7.5
        }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        interactiveLayerIds={["clusters", "unclustered", "depto-fill"]}
        onMove={(evt) => setViewState(evt.viewState)}
        onMouseMove={(e) => onMouseMove(e)}
        onClick={(e) => onClick(e)}
      >
        {popup && <PopupCustom popup={popup} setPopup={memoizedSetPopup} />}
        {tooltip && (
          <Popup
            longitude={tooltip.lng}
            latitude={tooltip.lat}
            anchor="bottom"
            closeButton={false}
            closeOnClick={false}
          >
            <p className="text-[12px] font-bold">{tooltip.name}</p>
            <div className="border-b border-neutral-300 mb-4"></div>
          </Popup>
        )}

        <NavigationControl position="top-right" />

        <MapBoxDepartment />
        <MapBoxSchool filtered={filtered} selectedSchoolId={selectedSchoolId} />
      </Map>
    </div>
  );
};

export default MapboxReal;
