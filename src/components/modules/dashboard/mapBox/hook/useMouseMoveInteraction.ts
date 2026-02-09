import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const useMouseMoveInteraction = (): {
  onMouseMove: (e: any) => void;
  tooltip: any;
} => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<any | null>(null);

  const onMouseMove = (e: any): void => {
    const school: any = e.features?.find((f: any) => f.layer.id === "unclustered");
    const depto: any = e.features?.find((f: any) => f.layer.id === "depto-fill");
    const cluster: any = e.features?.find((f: any) => f.layer.id === "clusters");

    if (cluster) {
      const clusterId = cluster.properties.cluster_id;
      const map = e.target;

      const source: any = map.getSource("escuelas");

      source.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
        if (err) return;

        map.easeTo({
          center: cluster.geometry.coordinates,
          zoom,
          duration: 900,
          curve: 1.6,
          easing: (t: number) => t * (2 - t)
        });
      });

      return;
    }

    if (school) {
      setTooltip({
        lng: school.geometry.coordinates[0],
        lat: school.geometry.coordinates[1],
        name: school.properties.name
      });
    } else {
      setTooltip(null);
    }

    if (!school && depto && depto.id != null) {
      if (hoveredId !== null) {
        e.target.setFeatureState({ source: "departments", id: hoveredId }, { hover: false });
      }

      setHoveredId(depto.id);
      e.target.setFeatureState({ source: "departments", id: depto.id }, { hover: true });
    }
  };

  return { onMouseMove, tooltip };
};

/* eslint-enable @typescript-eslint/no-explicit-any */
export { useMouseMoveInteraction };
