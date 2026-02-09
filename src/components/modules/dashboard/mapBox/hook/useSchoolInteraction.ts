import { Dispatch, SetStateAction } from "react";
import { PopupData } from "../../dashboard.type";

/* eslint-disable @typescript-eslint/no-explicit-any */

type SchoolInteractionProps = {
  setPopup: Dispatch<SetStateAction<PopupData | null>>;
  setSelectedSchoolId: Dispatch<SetStateAction<number | null>>;
  flyToSmooth: (map: any, center: [number, number], zoom?: number) => void;
};

const useSchoolInteraction = ({
  setPopup,
  setSelectedSchoolId,
  flyToSmooth
}: SchoolInteractionProps): {
  onSchoolMapClick: (
    target: any,
    schoolData: {
      properties: PopupData;
      geometry: {
        coordinates: [number, number];
      };
    }
  ) => void;
} => {
  const onSchoolMapClick = (
    target: any,
    schoolData: { properties: PopupData; geometry: { coordinates: [number, number] } }
  ): void => {
    const lng = schoolData.geometry.coordinates[0];
    const lat = schoolData.geometry.coordinates[1];

    const {
      id,
      name,
      code,
      zone,
      districtName,
      municipalityName,
      departmentName,
      region,
      teachersCount
    } = schoolData.properties;

    setSelectedSchoolId(id);
    setPopup({
      lng,
      lat,
      id,
      name,
      code,
      zone,
      districtName,
      municipalityName,
      departmentName,
      region,
      teachersCount
    });

    flyToSmooth(target, [lng, lat], 14);

    return;
  };

  return { onSchoolMapClick };
};

/* eslint-enable @typescript-eslint/no-explicit-any */
export { useSchoolInteraction };
