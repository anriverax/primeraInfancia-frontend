import { useMemo } from "react";
import { SchoolList } from "../../dashboard.type";

/*eslint-disable @typescript-eslint/no-explicit-any */
const useGeoJson = (filtered: SchoolList[]): any => {
  const geojson = useMemo(
    () => ({
      type: "FeatureCollection",
      features: filtered.map((e: SchoolList) => {
        const [lat, lng] = e.coordenates.split(",").map((c) => parseFloat(c.trim()));

        return {
          type: "Feature",
          properties: {
            id: e.id,
            name: e.name,
            code: e.code,
            zone: e.zone,
            districtName: e.districtName,
            municipalityName: e.municipalityName,
            departmentName: e.departmentName,
            region: e.region,
            teachersCount: e.teachersCount
          },
          geometry: {
            type: "Point",
            coordinates: [lng, lat]
          }
        };
      })
    }),
    [filtered]
  );

  return geojson;
};
/*eslint-enable @typescript-eslint/no-explicit-any */
export { useGeoJson };
