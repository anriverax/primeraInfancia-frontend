import { useState } from "react";
import { useSchoolInteraction } from "./useSchoolInteraction";
import { PopupData } from "../../dashboard.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
const useClickInteraction = (
  setSelectedDepto: React.Dispatch<React.SetStateAction<string | null>>,
  setPopup: React.Dispatch<React.SetStateAction<PopupData | null>>
): {
  onClick: (e: any) => void;
  selectedSchoolId: number | null;
} => {
  const [selectedSchoolId, setSelectedSchoolId] = useState<number | null>(null);

  const flyToSmooth = (map: any, center: [number, number], zoom = 12): void => {
    map.flyTo({
      center,
      zoom,
      speed: 1.2,
      curve: 1.6,
      easing: (t: number) => t * (2 - t)
    });
  };

  const { onSchoolMapClick } = useSchoolInteraction({ setPopup, setSelectedSchoolId, flyToSmooth });

  const onClick = (e: any): void => {
    const depto = e.features?.find((f: any) => f.layer.id === "depto-fill");
    const school = e.features?.find((f: any) => f.layer.id === "unclustered");
    const cluster = e.features?.find((f: any) => f.layer.id === "clusters");

    if (cluster) {
      const clusterId = cluster.properties.cluster_id;

      const source = e.target.getSource("escuelas");

      source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
        if (err) return;

        flyToSmooth(e.target, [cluster.geometry.coordinates[0], cluster.geometry.coordinates[1]], zoom);
      });

      return;
    }

    if (school) {
      onSchoolMapClick(e.target, school);
    }

    if (depto) {
      setSelectedDepto(depto.properties.name);

      const bbox = depto.geometry.coordinates.flat(2);
      const lngs = bbox.filter((_: any, i: number) => i % 2 === 0);
      const lats = bbox.filter((_: any, i: number) => i % 2 === 1);
      const bounds = [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)]
      ];
      e.target.fitBounds(bounds, { padding: 40, duration: 800 });
    }

    flyToSmooth(e.target, [e.lngLat.lng, e.lngLat.lat], 12);
  };

  return { onClick, selectedSchoolId };
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export { useClickInteraction };
